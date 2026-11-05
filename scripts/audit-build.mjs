/** Audit our generated static HTML and its local references without starting a browser. */
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { resolve, relative, extname, join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { gzipSync } from 'node:zlib';

export function readTags(html) {
  // Generated Astro HTML only: preserve opening raw-text tags but ignore their body.
  const clean = html.replace(/(<(script|style)\b[^>]*>)[\s\S]*?<\/\2>/gi, '$1');
  return [...clean.matchAll(/<([a-z][\w:-]*)\b((?:"[^"]*"|'[^']*'|[^'">])*)>/gi)].map((match) => {
    const attrs = {};
    for (const a of match[2].matchAll(
      /([\w:-]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g,
    ))
      attrs[a[1].toLowerCase()] = (a[2] ?? a[3] ?? a[4] ?? '').replaceAll('&amp;', '&');
    return { tag: match[1].toLowerCase(), attrs };
  });
}
function walk(root) {
  return readdirSync(root, { withFileTypes: true }).flatMap((entry) => {
    const file = join(root, entry.name);
    return entry.isDirectory() ? walk(file) : [file];
  });
}
export function auditBuild(directory) {
  const root = resolve(directory);
  if (!existsSync(root)) throw new Error('Build dist/ before auditing.');
  const htmlFiles = walk(root).filter((file) => extname(file) === '.html');
  const pages = new Map(htmlFiles.map((file) => [file, readTags(readFileSync(file, 'utf8'))]));
  const errors = [];
  let localReferences = 0;
  const fail = (file, message) => errors.push(relative(root, file) + ': ' + message);
  const localTarget = (source, href) => {
    if (/^(?:[a-z][\w+.-]*:|\/\/)/i.test(href)) return null;
    const url = new URL(
      href,
      'https://local.invalid/' + relative(root, source).replaceAll('\\', '/'),
    );
    let file = resolve(root, '.' + decodeURIComponent(url.pathname));
    if (!file.startsWith(root + '/') && file !== root) return null;
    if (existsSync(file) && statSync(file).isDirectory()) file = join(file, 'index.html');
    else if (!extname(file)) file = join(file, 'index.html');
    return { file, fragment: decodeURIComponent(url.hash.slice(1)) };
  };
  for (const [file, tags] of pages) {
    const html = readFileSync(file, 'utf8');
    const ids = tags.filter((t) => t.attrs.id).map((t) => t.attrs.id);
    if (new Set(ids).size !== ids.length) fail(file, 'duplicate element IDs');
    if (tags.filter((t) => t.tag === 'h1').length !== 1) fail(file, 'expected exactly one h1');
    if (!/<title>[^<]+<\/title>/.test(html)) fail(file, 'missing page title');
    if (!tags.some((t) => t.tag === 'meta' && t.attrs.name === 'description' && t.attrs.content))
      fail(file, 'missing description');
    if (
      !tags.some(
        (t) =>
          t.tag === 'link' &&
          t.attrs.rel === 'canonical' &&
          t.attrs.href?.startsWith('https://ikbak.vercel.app/'),
      )
    )
      fail(file, 'canonical origin mismatch');
    for (const { tag, attrs } of tags) {
      const refs = [];
      if (['a', 'link', 'use'].includes(tag) && attrs.href) refs.push(attrs.href);
      if (['img', 'script', 'source'].includes(tag) && attrs.src) refs.push(attrs.src);
      if (attrs.srcset)
        refs.push(...attrs.srcset.split(',').map((part) => part.trim().split(/\s+/)[0]));
      if (tag === 'img' && (!(Number(attrs.width) > 0) || !(Number(attrs.height) > 0)))
        fail(file, 'image missing intrinsic dimensions: ' + attrs.src);
      for (const href of refs) {
        const target = localTarget(file, href);
        if (!target) continue;
        localReferences++;
        if (!existsSync(target.file)) {
          fail(file, 'missing local reference ' + href);
          continue;
        }
        if (
          target.fragment &&
          pages.has(target.file) &&
          !pages.get(target.file).some((t) => t.attrs.id === target.fragment)
        )
          fail(file, 'missing fragment ' + href);
      }
      if (
        tag === 'a' &&
        (attrs.href === '/' || attrs.href?.startsWith('/#')) &&
        file !== join(root, 'index.html') &&
        !('data-astro-reload' in attrs)
      )
        fail(file, 'homepage boundary requires native navigation: ' + attrs.href);
    }
  }
  for (const css of walk(root).filter((f) => extname(f) === '.css')) {
    for (const match of readFileSync(css, 'utf8').matchAll(/url\(\s*["']?([^\s"')]+)["']?\s*\)/g)) {
      const target = localTarget(css, match[1]);
      if (target && !existsSync(target.file)) fail(css, 'missing CSS asset ' + match[1]);
    }
  }
  const home = join(root, 'index.html');
  const homeTags = pages.get(home) ?? [];
  const initial = homeTags
    .filter(
      (t) =>
        (t.tag === 'script' && t.attrs.src) ||
        (t.tag === 'link' && t.attrs.rel === 'modulepreload'),
    )
    .map((t) => t.attrs.src ?? t.attrs.href);
  const scripts = new Set();
  const visit = (source, href) => {
    const target = localTarget(source, href);
    if (!target || scripts.has(target.file) || !existsSync(target.file)) return;
    scripts.add(target.file);
    for (const m of readFileSync(target.file, 'utf8').matchAll(
      /import\s*(?:[\w*$,\s{}]+\s*from\s*)?["']([^"']+)["']/g,
    ))
      visit(target.file, m[1]);
  };
  initial.forEach((href) => visit(home, href));
  const initialJavaScript = [...scripts].map((file) => {
    const bytes = readFileSync(file);
    return { file: relative(root, file), bytes: bytes.length, gzipBytes: gzipSync(bytes).length };
  });
  if (initialJavaScript.some((entry) => /gsap|transitions\./i.test(entry.file)))
    fail(home, 'weather animation engine is loaded before a user request');
  return {
    pages: pages.size,
    localReferences,
    initialJavaScript,
    initialJavaScriptBytes: initialJavaScript.reduce((n, f) => n + f.bytes, 0),
    initialJavaScriptGzipBytes: initialJavaScript.reduce((n, f) => n + f.gzipBytes, 0),
    errors,
  };
}
if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const report = auditBuild(process.argv[2] ?? 'dist');
  console.log(JSON.stringify(report, null, 2));
  if (report.errors.length) process.exitCode = 1;
}
