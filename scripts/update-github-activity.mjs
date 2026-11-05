import { readFile, mkdir, writeFile, rename } from 'node:fs/promises';
import { createActivitySnapshot, isActivitySnapshot } from '../src/lib/github-activity.ts';
const path = new URL('../public/data/github-activity.json', import.meta.url);
let cached;
try {
  cached = JSON.parse(await readFile(path, 'utf8'));
} catch {
  /* first build */
}
if (isActivitySnapshot(cached) && Date.now() - Date.parse(cached.fetchedAt) < 3_600_000) {
  console.log('GitHub activity: using verified recent snapshot.');
} else {
  try {
    const response = await fetch('https://github-contributions-api.jogruber.de/v4/ikbakk?y=last', {
      signal: AbortSignal.timeout(10_000),
      headers: { accept: 'application/json' },
    });
    if (!response.ok) throw new Error('HTTP ' + response.status);
    const text = await response.text();
    if (text.length > 200_000) throw new Error('Unexpected response size');
    const snapshot = createActivitySnapshot(JSON.parse(text), {
      username: 'ikbakk',
      asOf: new Date().toISOString().slice(0, 10),
      fetchedAt: new Date().toISOString(),
    });
    await mkdir(new URL('../public/data/', import.meta.url), { recursive: true });
    const temporary = new URL('../public/data/github-activity.pending', import.meta.url);
    await writeFile(temporary, JSON.stringify(snapshot, null, 2) + '\n');
    await rename(temporary, path);
    console.log('GitHub activity: refreshed verified snapshot for ikbakk.');
  } catch (error) {
    if (isActivitySnapshot(cached))
      console.warn('GitHub activity: refresh unavailable; preserving last-good data.');
    else {
      await mkdir(new URL('../public/data/', import.meta.url), { recursive: true });
      await writeFile(path, JSON.stringify({ status: 'unavailable', username: 'ikbakk' }) + '\n');
      console.warn('GitHub activity unavailable; the widget will show its fallback.');
    }
  }
}
