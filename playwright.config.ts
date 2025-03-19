import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig, cucumberReporter } from 'playwright-bdd';

const testDir = defineBddConfig({
  features: 'features/*.feature',
  steps: 'features/stepDefinitions/*.ts',
});

const isZapTest = process.env.ZAP_TEST === 'true';

export default defineConfig({
  testDir,
  reporter: [
    cucumberReporter('html', {
      outputFile: 'cucumber-report/index.html',
      externalAttachments: true,
      attachmentsBaseURL: 'http://127.0.0.1:8080/data',
    }),
    ['html', { open: 'never' }],
  ],
  use: {
    screenshot: 'on',
    trace: 'on',
  },
  grepInvert: isZapTest ? undefined : /@zap-security/, // Exclude security tests by default
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1366, height: 768 }, // viewport: {width: 1280, height: 720},
      },
      fullyParallel: true,
    },

    {
      name: 'firefox', // Desktop Firefox
      use: {
        ...devices['Desktop Firefox'],
      },
      fullyParallel: true,
    },

    {
      name: 'webkit', // macOS Safari
      use: {
        ...devices['Desktop Safari'],
      },
      fullyParallel: true,
    },
  ],
  expect: { timeout: 12000 },
  timeout: 60000, // Timeout for the entire test
  workers: 1,
  retries: 2
});
