
import { Given, When, Then } from './fixtures';

Given(/^I am on the OrangeHRM login page$/, async ({ loginPage }) => {
  await loginPage.launchTheLoginPage();
});

When(/^I enter valid username and password to Login$/, async ({ loginPage }) => {
  await loginPage.enterValidCredentials();
  await loginPage.clickLogin();
});

When(/^I enter username "(.+)" and password "(.+)" to Login$/, async ({ loginPage }, username: string, password: string) => {
  await loginPage.enterUser(username);
  await loginPage.enterPassword(password);
  await loginPage.clickLogin();
});

Then('I should see an invalid login error message', async ({ loginPage }) => {
  await loginPage.verifyInvalidLogin();
});