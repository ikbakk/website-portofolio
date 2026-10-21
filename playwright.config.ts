import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests',
  timeout: 20000,
  expect: { timeout: 5000 },
  fullyParallel: true,
  workers: 3,
  reporter: 'list',
  use: {
    baseURL: 'http://127.0.0.1:4400',
    browserName: 'chromium',
    viewport: { width: 1440, height: 1000 },
    trace: 'retain-on-failure',
  },
  webServer: {
    command: 'node node_modules/astro/bin/astro.mjs preview --host 127.0.0.1 --port 4400',
    url: 'http://127.0.0.1:4400',
    reuseExistingServer: !process.env.CI,
  },
});
