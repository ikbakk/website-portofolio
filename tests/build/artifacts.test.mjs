import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { auditBuild, readTags } from '../../scripts/audit-build.mjs';
const page = (body) =>
  `<title>Portfolio</title><meta name="description" content="Real work"><link rel="canonical" href="https://ikbak.vercel.app/"><h1>Iqbal</h1>${body}`;

test('generated tag reader handles SVG, boolean attributes, quoted > and raw script strings', () => {
  const tags = readTags(
    `<a data-astro-reload title="A > B" href="/#work">Work</a><script>const ignored = '<a href="/fake">';</script><svg><use href="#leaf" /></svg>`,
  );
  assert.equal(tags.filter((t) => t.tag === 'a').length, 1);
  assert.equal(tags[0].attrs.title, 'A > B');
  assert.ok('data-astro-reload' in tags[0].attrs);
  assert.equal(tags.at(-1).attrs.href, '#leaf');
});

test('audit catches deleted anchors, missing assets and broken router boundary while following real static imports', () => {
  const root = mkdtempSync(join(tmpdir(), 'portfolio-build-'));
  try {
    mkdirSync(join(root, '_astro'));
    mkdirSync(join(root, 'projects/demo'), { recursive: true });
    writeFileSync(
      join(root, 'index.html'),
      page('<div id="profile"></div><script type="module" src="/_astro/home.js"></script>'),
    );
    writeFileSync(
      join(root, '_astro/home.js'),
      'import "./shared.js"; const animation=()=>import("./gsap.js");',
    );
    writeFileSync(join(root, '_astro/shared.js'), 'export const shared = true;');
    writeFileSync(join(root, '_astro/gsap.js'), 'export const animation = true;');
    writeFileSync(
      join(root, 'projects/demo/index.html'),
      page('<a href="/#profile" data-astro-reload>Home</a>'),
    );
    let result = auditBuild(root);
    assert.deepEqual(result.errors, []);
    assert.equal(result.initialJavaScript.length, 2);
    writeFileSync(
      join(root, 'projects/demo/index.html'),
      page('<a href="/#removed">Home</a><img src="/missing.webp" width="10" height="10">'),
    );
    result = auditBuild(root);
    assert.ok(result.errors.some((e) => e.includes('missing fragment')));
    assert.ok(result.errors.some((e) => e.includes('missing local reference')));
    assert.ok(result.errors.some((e) => e.includes('native navigation')));
    writeFileSync(join(root, '_astro/home.js'), 'import "./gsap.js";');
    assert.ok(auditBuild(root).errors.some((e) => e.includes('before a user request')));
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test('current production export has valid routes, metadata and local dependencies', () => {
  const result = auditBuild('dist');
  assert.equal(result.pages, 7);
  assert.ok(result.localReferences > 100);
  assert.deepEqual(result.errors, []);
  assert.ok(
    result.initialJavaScriptBytes < 20000,
    `Initial JS is ${result.initialJavaScriptBytes} bytes`,
  );
});
