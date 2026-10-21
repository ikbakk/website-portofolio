import { mkdir, readFile, writeFile } from 'node:fs/promises';

await mkdir('public/celestial/icons', { recursive: true });
const sprite = await readFile('public/celestial/symbols.svg', 'utf8');
let count = 0;
for (const match of sprite.matchAll(
  /<symbol id="([^"]+)" viewBox="([^"]+)">([\s\S]*?)<\/symbol>/g,
)) {
  const [, name, viewBox, body] = match;
  await writeFile(
    `public/celestial/icons/${name}.svg`,
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" fill="none" stroke="currentColor" color="#cbb88f" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">${body}</svg>\n`,
  );
  count++;
}
const html = await readFile('dist/index.html', 'utf8');
const orbit = html.match(/<svg[^>]*class="identity-orbits"[\s\S]*?<\/svg>/)?.[0];
if (!orbit) throw new Error('Build the home page before exporting constellation artwork');
await writeFile(
  'public/celestial/constellation.svg',
  orbit.replace(
    '<svg ',
    '<svg xmlns="http://www.w3.org/2000/svg" width="460" height="460" color="#dac291" ',
  ),
);
console.log(`Exported ${count} standalone SVG icons and constellation.svg`);
