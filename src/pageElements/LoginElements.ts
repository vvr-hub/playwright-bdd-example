import { Page } from "@playwright/test";

export class LoginElements {
    constructor(public page: Page) { }

    loginPageHeader = this.page.getByRole('heading', { name: 'Login' });
    usernameInputbox = this.page.locator('input[name="username"]');
    passwordInputbox = this.page.locator('input[name="password"]');
    loginButton = this.page.locator('button[type="submit"]');
    invalidCredentialsErrMsg = this.page.getByText('Invalid credentials');
}