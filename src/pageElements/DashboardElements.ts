import { Page } from "@playwright/test";

export class DashboardElements {
    constructor(public page: Page) { }

    dashboardHeader = this.page.getByRole('heading', { name: 'Dashboard' });
    quickLaunchIcon = this.page.locator('.orangehrm-dashboard-widget-body .orangehrm-quick-launch-icon');
    userDropdown = this.page.locator('.oxd-userdropdown-name');
    logoutOption = this.page.getByRole('menuitem', {name: 'Logout'})
    adminPageHeader = this.page.getByRole('heading', { name: 'Admin' });
}