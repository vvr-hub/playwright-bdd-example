import { Page } from '@playwright/test';

import { SharedElements } from '../pageElements/SharedElements';

export default class Shared {
    elements = new SharedElements(this.page);
    constructor(public page: Page) { }

    async clickItemInLeftPanel(itemLabel: string) {
        await this.elements.itemInLeftPanel(itemLabel).click();
    }

    // All (potentially) shared functions in the future will be placed here.
}