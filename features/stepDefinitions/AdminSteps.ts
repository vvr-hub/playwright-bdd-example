import { Then } from './fixtures';

Then('I should be navigated to the Admin page', async ({ adminPage }) => {
    await adminPage.verifyAdminPageNavigation();
});