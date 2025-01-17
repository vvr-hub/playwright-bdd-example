import { Given, When, Then } from './fixtures';

Given('I should see the "Dashboard" header', async ({ dashboardPage }) => {
    await dashboardPage.verifyDashboardHeader();
});

Then('I should land on the Dashboard', async ({ dashboardPage }) => {
    await dashboardPage.verifyLandedOnDashboard();
});

Then(/^I should see the Quick Launch panel with (\d+) icons$/, async ({ dashboardPage }, count: number) => {
    await dashboardPage.checkQuickLaunchIcons(count);
});

When('I click on the user dropdown', async ({ dashboardPage }) => {
    await dashboardPage.openUserDropdown();
});

Then('I should see the "Logout" option', async ({ dashboardPage }) => {
    await dashboardPage.verifyLogoutOptionVisible();
});