import test from 'node:test';
import assert from 'node:assert/strict';
import { RallyGame, MemoryGame, ReactionGame, shuffleElements } from '../../src/lib/playground.ts';
import { createActivitySnapshot, isActivitySnapshot } from '../../src/lib/github-activity.ts';

const options = { username: 'ikbakk', asOf: '2026-11-04', fetchedAt: '2026-11-04T12:00:00Z' };
const payload = () => ({
  contributions: Array.from({ length: 365 }, (_, i) => ({
    date: new Date(Date.UTC(2026, 10, 4) - i * 86400000).toISOString().slice(0, 10),
    count: 1,
    level: 1,
  })),
});

test('activity window has 12 calendar weeks, real totals and empty future cells', () => {
  const snapshot = createActivitySnapshot(payload(), options);
  assert.equal(snapshot.days.length, 84);
  assert.equal(snapshot.startsOn, '2026-08-16');
  assert.equal(snapshot.total, 81);
  assert.equal(snapshot.activeDays, 81);
  assert.equal(snapshot.longestStreak, 81);
  assert.deepEqual(snapshot.days.at(-1), { date: '2026-11-07', count: null, level: null });
  assert.equal(isActivitySnapshot(snapshot), true);
});

test('broken upstream payloads cannot replace a verified snapshot', () => {
  for (const mutate of [
    (p) => p.contributions.splice(2, 1),
    (p) => p.contributions.push(p.contributions[0]),
    (p) => {
      p.contributions[0].count = -1;
    },
    (p) => {
      p.contributions[0].date = '2026-02-30';
    },
    (p) => {
      p.contributions[0].level = 5;
    },
  ]) {
    const p = payload();
    mutate(p);
    assert.throws(() => createActivitySnapshot(p, options));
  }
  assert.throws(() => createActivitySnapshot({}, options));
});

test('cached snapshot reader rejects corruption instead of displaying fake zeroes', () => {
  for (const mutate of [
    (p) => {
      p.total++;
    },
    (p) => {
      p.days[0] = null;
    },
    (p) => {
      p.days[0].date = '2026-08-17';
    },
    (p) => {
      p.days.at(-1).count = 0;
    },
    (p) => {
      p.asOf = '2027-11-04';
    },
  ]) {
    const snapshot = createActivitySnapshot(payload(), options);
    mutate(snapshot);
    assert.equal(isActivitySnapshot(snapshot), false);
  }
  assert.equal(isActivitySnapshot(null), false);
});

test('rally enforces timing, ends on misses and retains session best', () => {
  const rally = new RallyGame();
  assert.equal(rally.hit(), false);
  rally.start();
  rally.x = 0.5;
  assert.equal(rally.hit(), true);
  assert.equal(rally.hits, 1);
  assert.equal(rally.hit(), false);
  assert.equal(rally.missed, true);
  rally.start();
  assert.equal(rally.hits, 0);
  assert.equal(rally.best, 1);
  rally.x = 0.99;
  rally.tick(0.1);
  assert.equal(rally.running, false);
});

test('calm mode has no automatic movement or timing failures', () => {
  const rally = new RallyGame();
  rally.start(true);
  rally.tick(100);
  assert.equal(rally.x, 0.5);
  for (let i = 0; i < 4; i++) assert.equal(rally.hit(), true);
  assert.equal(rally.hits, 4);
  rally.stop();
  assert.equal(rally.hit(), false);
});

test('reaction test rejects early starts and measures only after lights out', () => {
  const game = new ReactionGame();
  assert.equal(game.react(50), null);
  game.start();
  assert.equal(game.react(100), null);
  assert.equal(game.state, 'early');
  game.go(110);
  assert.equal(game.state, 'early');
  game.start();
  game.go(1000);
  assert.equal(game.react(1234.4), 234);
  assert.equal(game.react(1300), null);
  game.reset();
  assert.equal(game.state, 'ready');
  assert.equal(game.milliseconds, null);
});

test('memory blocks duplicate flips and third cards until a mismatch clears', () => {
  const game = new MemoryGame(() => 0.999);
  assert.equal(game.flip(0), 'first');
  assert.equal(game.flip(0), 'ignored');
  assert.equal(game.flip(1), 'miss');
  assert.equal(game.flip(2), 'ignored');
  game.clearMiss();
  assert.equal(game.open.size, 0);
  assert.equal(game.flip(-1), 'ignored');
  assert.equal(game.flip(6), 'ignored');
});

test('memory has exactly three pairs and ends after all are matched', () => {
  const deck = shuffleElements(() => 0.999);
  assert.deepEqual([...deck].sort(), ['cryo', 'cryo', 'dendro', 'dendro', 'electro', 'electro']);
  const game = new MemoryGame(() => 0.999);
  for (let i = 0; i < 3; i++) {
    assert.equal(game.flip(i), 'first');
    assert.equal(game.flip(i + 3), i === 2 ? 'won' : 'match');
  }
  assert.equal(game.turns, 3);
  assert.equal(game.matched.size, 6);
  assert.equal(game.flip(0), 'ignored');
});

import { mkdtemp, mkdir, cp, writeFile, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';

test('updater preserves last-good bytes on network failure and marks first-run failure unavailable', async () => {
  const root = await mkdtemp(join(tmpdir(), 'portfolio-activity-'));
  try {
    await mkdir(join(root, 'scripts'), { recursive: true });
    await mkdir(join(root, 'src/lib'), { recursive: true });
    await mkdir(join(root, 'public/data'), { recursive: true });
    await writeFile(join(root, 'package.json'), '{"type":"module"}');
    await cp(
      new URL('../../scripts/update-github-activity.mjs', import.meta.url),
      join(root, 'scripts/update-github-activity.mjs'),
    );
    await cp(
      new URL('../../src/lib/github-activity.ts', import.meta.url),
      join(root, 'src/lib/github-activity.ts'),
    );
    await writeFile(
      join(root, 'offline.mjs'),
      'globalThis.fetch = async () => { throw new Error("test offline"); };',
    );
    const cache = join(root, 'public/data/github-activity.json');
    const snapshot = createActivitySnapshot(payload(), {
      ...options,
      fetchedAt: '2020-01-01T00:00:00Z',
    });
    const bytes = JSON.stringify(snapshot);
    await writeFile(cache, bytes);
    const run = () =>
      spawnSync(
        process.execPath,
        [
          '--experimental-strip-types',
          '--import',
          join(root, 'offline.mjs'),
          join(root, 'scripts/update-github-activity.mjs'),
        ],
        { encoding: 'utf8' },
      );
    let result = run();
    assert.equal(result.status, 0, result.stderr);
    assert.equal(await readFile(cache, 'utf8'), bytes);
    await writeFile(cache, '{"broken":true}');
    result = run();
    assert.equal(result.status, 0, result.stderr);
    assert.deepEqual(JSON.parse(await readFile(cache, 'utf8')), {
      status: 'unavailable',
      username: 'ikbakk',
    });
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});
