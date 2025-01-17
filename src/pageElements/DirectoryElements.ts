import { Page } from "@playwright/test";

export class DirectoryElements {
    constructor(public page: Page) { }

    directoryHeader = this.page.locator('//h6[text()="Directory"]');
    searchNameInput = this.page.locator('[placeholder="Type for hints..."]');
    jobTitleDropdown = this.page.locator('form i').first();
    locationDropdown = this.page.locator('form i').last();
    dropdownOption = (optionText: string) => this.page.getByRole('option', { name: optionText });
    hintOption = (hint: string) => this.page.getByRole('option', { name: hint, exact: true }).locator('span');
    noRecordsFoundMsg = this.page.getByText('No Records Found');
    searchResult = (employeeName: string) => this.page.locator("//*[contains(@class, 'white orangehrm-directory-card')]").getByText(employeeName).first();
}