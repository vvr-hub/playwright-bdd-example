import { expect, Page } from '@playwright/test';

import { LoginElements } from "../pageElements/LoginElements";

import { getConfig } from '../../envConfig';

import { API_ENDPOINTS } from '../constants/apiEndpoints';

export default class LoginPage {
    elements = new LoginElements(this.page);
    constructor(public page: Page) { }

    async launchTheLoginPage() {
        // Getting the base URL of the HR management application from config file as per the targeted environment.
        const { baseUrl } = getConfig();
        await this.page.goto(`${baseUrl}web/index.php/auth/login`);
        await expect(this.elements.loginPageHeader).toBeVisible();
    }

    async enterValidCredentials() {
        // Getting the username and password (test data) from the config file as per the targeted environment.
        const { credentials } = getConfig();
        await this.enterUser(credentials.username);
        await this.enterPassword(credentials.password);
    }

    async enterUser(username: string) {
        await this.elements.usernameInputbox.fill(username);
    }

    async enterPassword(password: string) {
        await this.elements.passwordInputbox.fill(password);
    }

    async clickLogin() {
        // Intercepting and validating API requests triggered when we submit username & password
        const responsePromise = this.page.waitForResponse(response =>
            response.url().endsWith(API_ENDPOINTS.AUTHENTICATION.VALIDATE_LOGIN) && 
            response.status() === 302
            && response.request().method() === 'POST'
        );
   
        await this.elements.loginButton.click();

        await responsePromise; // Awaiting confirmation of successful API calls before continuing the test.
    }

    async verifyInvalidLogin() {
        await expect(this.elements.invalidCredentialsErrMsg).toBeVisible();
    }
}