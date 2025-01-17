
import { When } from './fixtures';

When(/^I click on the "(.+)" item in the left panel$/, async ({ shared }, itemLabel) => {
  await shared.clickItemInLeftPanel(itemLabel);
});

// All (potentially) shared Step Definitions in the future will be placed here.