import { expect, Page } from '@playwright/test';

import { AdminElements } from "../pageElements/AdminElements";

export default class AdminPage {
    elements = new AdminElements(this.page);
    constructor(public page: Page) { }

    async verifyAdminPageNavigation() {
        await expect(this.elements.adminPageHeader).toBeVisible();
        await expect(this.page).toHaveURL(/web\/index.php\/admin\/viewSystemUsers/); // Regex for Admin URL
    }
}