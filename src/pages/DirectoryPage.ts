import { expect, Page } from '@playwright/test';

import { SharedElements } from "../pageElements/SharedElements";
import { DirectoryElements } from "../pageElements/DirectoryElements";

export default class DirectoryPage {
    elements = new DirectoryElements(this.page);
    sharedElements = new SharedElements(this.page);
    constructor(public page: Page) { }

    async verifyDirectoryPageNavigation() {
        await expect(this.elements.directoryHeader).toBeVisible();
        await expect(this.page).toHaveURL(/web\/index.php\/directory\/viewDirectory/); // Regex for Directory URL
    }

    async verifyFilterOptionsInDirectoryPage() {
        await expect(this.elements.searchNameInput).toBeVisible();
        await expect(this.elements.jobTitleDropdown).toBeVisible();
        await expect(this.elements.locationDropdown).toBeVisible();
    }

    async enterEmployeeName(name: string) {
        await this.elements.searchNameInput.fill(name);
        if (name !== 'NonExistingUser') {
            await this.elements.hintOption(name).click();
        }
    }

    async verifyNoRecordsFound() {
        await expect(this.elements.noRecordsFoundMsg).toBeVisible();
    }

    async clickSearchButton() {
        await this.sharedElements.searchButton.click();
        await expect(this.sharedElements.loader).toHaveCount(0); // Wait for loader(s) to disappear.
    }
}