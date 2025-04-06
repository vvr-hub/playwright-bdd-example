
import { runAccessibilityCheck, saveAccessibilityReport } from '../../src/utils/accessibilityUtils';
import { Then, When } from './fixtures';
import { test } from '@playwright/test';

When(/^I click on the "(.+)" item in the left panel$/, async ({ shared }, itemLabel) => {
  await shared.clickItemInLeftPanel(itemLabel);
});

Then('the page should have no accessibility violations', async ({ page, browserName }) => {
  const now = new Date().toISOString().replace(/[:.]/g, '-');

  const rawTitle = test.info().title;
  const scenarioName = rawTitle.replace(/\s+/g, '-').toLowerCase();
  const tags = (rawTitle.match(/@[\w-]+/g) || []).map(t => t.replace('@', ''));

  const reportName = `a11y-${scenarioName}-${tags.join('-')}-${browserName}-${now}.html`;

  const results = await runAccessibilityCheck(page);
  const passed = results.violations.length === 0;

  await saveAccessibilityReport(results, reportName, {
    scenario: rawTitle,
    tags,
    browserName,
    passed,
  });

  if (!passed) {
    throw new Error(
      `Accessibility violations found:\n` +
      results.violations
        .map((v) => `• [${v.id}] ${v.help} (${v.impact})\n  ${v.helpUrl}`)
        .join('\n')
    );
  }
});


// All (potentially) shared Step Definitions in the future will be placed here.