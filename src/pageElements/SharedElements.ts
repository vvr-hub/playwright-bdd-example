import { Page } from "@playwright/test";

export class SharedElements {
    constructor(public page: Page) { }

    loader = this.page.locator('.oxd-loading-spinner');
    searchButton = this.page.getByRole('button', { name: 'Search' });
    itemInLeftPanel = (itemLabel: string) => this.page.getByRole('link', { name: itemLabel }).first();
    
    // All (potentially) shared elements in the future will be placed here.
}