/**
 * Non-runtime P1 validation. Runs on Node, no extra packages.
 * It does not approve the design or validate visual fidelity.
 */
import { existsSync, readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join } from 'node:path';

const root = process.cwd();
const strict = process.argv.includes('--strict');
let failures = 0;
const fail = (message) => {
  console.error('FAIL:', message);
  failures++;
};
const requireFile = (path) => {
  const absolute = join(root, path);
  if (!existsSync(absolute)) {
    fail('Missing ' + path);
    return null;
  }
  return readFileSync(absolute);
};

const cssBuffer = requireFile('src/styles/weather-themes.tokens.css');
const configBuffer = requireFile('src/theme/weather.config.ts');
const css = cssBuffer?.toString('utf8') ?? '';
const config = configBuffer?.toString('utf8') ?? '';
const ids = ['normal', 'cryo', 'electro'];
for (const id of ids) {
  if (!config.includes("id: '" + id + "'")) fail('Missing theme config ' + id);
  if (!css.includes("--weather-horizon: url('/weather/" + id + "/horizon.svg')"))
    fail('Horizon token missing: ' + id);
  if (!css.includes('--weather-action-bg:')) fail('Missing action background token');
  if (id !== 'normal' && !css.includes("[data-weather='" + id + "']")) {
    fail('Missing CSS selector for ' + id);
  }
  for (const type of ['edge', 'corner', 'horizon']) {
    const path = 'public/weather/' + id + '/' + type + '.svg';
    const data = requireFile(path)?.toString('utf8') ?? '';
    if (data && (!data.startsWith('<svg') || !data.includes('</svg>'))) {
      fail('SVG is missing root/closing tag: ' + path);
    }
    if (data && /<script\b|onload\s*=|<foreignObject\b/i.test(data)) {
      fail('Suspicious executable SVG markup in ' + path);
    }
  }
}
// For filled actions, both the background and text color must be contrast-safe.
function relativeLuminance(hex) {
  const channels = hex
    .replace('#', '')
    .match(/.{2}/g)
    .map((part) => parseInt(part, 16) / 255);
  const linear = channels.map((value) =>
    value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4,
  );
  return linear[0] * 0.2126 + linear[1] * 0.7152 + linear[2] * 0.0722;
}
function contrast(a, b) {
  const values = [relativeLuminance(a), relativeLuminance(b)].sort((x, y) => x - y);
  return (values[1] + 0.05) / (values[0] + 0.05);
}
for (const id of ids) {
  const selector =
    id === 'normal'
      ? /:root,\s*\[data-weather='normal'\]\s*\{([^}]*)\}/
      : new RegExp("\\[data-weather='" + id + "'\\]\\s*\\{([^}]*)\\}");
  const block = css.match(selector)?.[1];
  if (!block) {
    fail('Could not find CSS rule for ' + id);
    continue;
  }
  const getHex = (key) => block.match(new RegExp(key + '\\s*:\\s*(#[0-9a-fA-F]{6})\\s*;'))?.[1];
  const bg = getHex('--weather-action-bg');
  const fg = getHex('--weather-action-text');
  if (!bg || !fg) {
    fail('Action tokens missing in ' + id);
    continue;
  }
  const value = contrast(bg, fg);
  if (value < 4.5) fail(id + ': text/action contrast ' + value.toFixed(2) + ':1 < 4.5:1');
}

if (!config.includes("defaultWeatherTheme: WeatherThemeId = 'normal'")) {
  fail('Default weather theme is not normal');
}
for (const key of [
  '--weather-background',
  '--weather-surface',
  '--weather-primary',
  '--weather-text',
  '--weather-ornament',
]) {
  if (!css.includes(key)) fail('Missing token ' + key);
}

// Do not accidentally activate experimental ornaments in the P2 surface.
if (/\/weather\/(normal|cryo|electro)\/(edge|corner)\.svg/.test(css + config)) {
  fail('Experimental edge/corner SVG referenced by active P1 config or tokens');
}

const pngs = [
  ['01-normal-master.png', '64c5116914745e6b3677f0ada5bc238a221afd2e963fdf59f5dc07c91a7fdc57'],
  ['02-cryo-variant.png', '015d742ea2d4297eaaf2db61ac476e941f467cac0ca4adb9186f0c19ca8109bd'],
  ['03-electro-variant.png', '2811e80e892d132647fc2b544d7a6af74cd510baef5254a02367f8707e01a841'],
];
let count = 0;
for (const [name, expected] of pngs) {
  const path = 'docs/design/references/' + name;
  if (!existsSync(join(root, path))) {
    console.warn('PENDING: approved frozen image not yet uploaded:', path);
    continue;
  }
  count++;
  const actual = createHash('sha256')
    .update(readFileSync(join(root, path)))
    .digest('hex');
  if (actual !== expected) fail('Frozen source hash mismatch: ' + name);
}
if (count !== pngs.length) {
  console.warn('P1 readiness incomplete: ' + count + '/3 reference PNGs available');
  if (strict) fail('Strict P1 validation requires all three frozen mockup images');
}
if (failures) {
  console.error(failures + ' P1 structural validation failures');
  process.exitCode = 1;
} else {
  console.log(
    'P1 structural checks passed; reference images ' +
      count +
      '/3; final owner approval remains separate.',
  );
}
