import { Page } from "@playwright/test";

export class DirectoryElements {
    constructor(public page: Page) { }

    directoryHeader = this.page.locator('//h6[text()="Directory"]');
    searchNameInput = this.page.locator('[placeholder="Type for hints..."]');
    jobTitleDropdown = this.page.locator('form i').first();
    locationDropdown = this.page.locator('form i').last();
    hintOption = (hint: string) => this.page.getByRole('option', { name: hint, exact: true }).locator('span');
    noRecordsFoundMsg = this.page.getByText('No Records Found');
}