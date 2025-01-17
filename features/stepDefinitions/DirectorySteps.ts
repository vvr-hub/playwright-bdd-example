import { Given, When, Then } from './fixtures';

Given(/^I should be navigated to the Directory page$/, async ({ directoryPage }) => {
    await directoryPage.verifyDirectoryPageNavigation();
});

Then(/^there are filters for Employee Name, Job Title and Location$/, async ({ directoryPage }) => {
    await directoryPage.verifyFilterOptionsInDirectoryPage();
});

When(/^I enter employee name "(.+)"$/, async ({ directoryPage }, name: string) => {
    await directoryPage.enterEmployeeName(name);
});

Then(/^I should see no records found$/, async ({ directoryPage }) => {
    await directoryPage.verifyNoRecordsFound();
});

When(/^I click the Search button$/, async ({ directoryPage }) => {
    await directoryPage.clickSearchButton();
});