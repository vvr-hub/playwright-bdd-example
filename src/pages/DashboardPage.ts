import { expect, Page } from '@playwright/test';

import { DashboardElements } from "../pageElements/DashboardElements";

export default class DashboardPage {
    elements = new DashboardElements(this.page);
    constructor(public page: Page) { }

    async verifyLandedOnDashboard() {
        const dashboardUrl = /web\/index.php\/dashboard/; // Regex for dashboard URL
        await expect(this.page).toHaveURL(dashboardUrl);
    }

    async verifyDashboardHeader() {
        await expect(this.elements.dashboardHeader).toBeVisible();
    }

    async checkQuickLaunchIcons(count: number) {
        await expect(this.elements.quickLaunchIcon).toHaveCount(count);
    }

    async openUserDropdown() {
        await this.elements.userDropdown.click();
    }

    async verifyLogoutOptionVisible() {
        await expect(this.elements.logoutOption).toBeVisible();
    }
}