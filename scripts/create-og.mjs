import { readFile, readdir } from 'node:fs/promises';
import { chromium } from 'playwright';

const file = (path) => readFile(path);
const background = (await file('public/celestial/celestial-city.webp')).toString('base64');
const mark = await readFile('public/celestial/monogram.svg', 'utf8');
const fontDir = 'node_modules/@fontsource-variable/newsreader/files/';
const fontName = (await readdir(fontDir)).find((name) => name.endsWith('latin-wght-normal.woff2'));
if (!fontName) throw new Error('Newsreader latin font not found');
const font = (await file(fontDir + fontName)).toString('base64');
const browser = await chromium.launch();
try {
  const page = await browser.newPage({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 1,
  });
  await page.setContent(
    `<style>@font-face{font-family:Display;src:url(data:font/woff2;base64,${font})}*{box-sizing:border-box}body{margin:0;width:1200px;height:630px;background:#14263d url(data:image/webp;base64,${background}) center 60%/cover;color:#f2ebdd;font-family:Display,serif}main{height:100%;display:flex;align-items:center;padding:68px;background:linear-gradient(90deg,#09182bf2,#09182b60)}h1{font-size:68px;font-weight:500;line-height:1.1;margin:20px 0}p{font-size:28px;margin:18px 0}.small{font-size:20px;color:#ddc99f}.copy{width:640px}.mark{width:380px;flex-shrink:0;position:relative}.mark:before{content:'';position:absolute;inset:5px;border:1px solid #b8a175;border-radius:50%}.mark svg{width:100%}</style><main><div class="copy"><p class="small">Iqbal / Portfolio</p><h1>Muhammad<br>Iqbal Firdaus</h1><p>Frontend &amp; mobile engineer</p><p class="small">Web, mobile &amp; practical tools. From Mataram.</p></div><div class="mark">${mark}</div></main>`,
  );
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: 'public/og.jpg', type: 'jpeg', quality: 88 });
  console.log('Created public/og.jpg (1200 x 630) from original identity assets.');
} finally {
  await browser.close();
}
