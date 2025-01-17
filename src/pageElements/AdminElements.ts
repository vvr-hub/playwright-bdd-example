import { Page } from "@playwright/test";

export class AdminElements {
    constructor(public page: Page) { }

    adminPageHeader = this.page.getByRole('heading', { name: 'Admin' });
}