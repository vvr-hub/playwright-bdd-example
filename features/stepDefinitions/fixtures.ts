import { test as base, createBdd } from 'playwright-bdd';
import * as pages from "../../src/pages/pageIndex";

type Fixtures = {
  // setting types of fixtures here
  adminPage: pages.AdminPage;
  loginPage: pages.LoginPage;
  dashboardPage: pages.DashboardPage;
  directoryPage: pages.DirectoryPage;
  employeeManagementPage: pages.EmployeeManagementPage;
  shared: pages.Shared;
};

export const test = base.extend<Fixtures>({
  // adding the fixtures here
  adminPage: async ({ page }, use) => { await use(new pages.AdminPage(page)); },
  loginPage: async ({ page }, use) => { await use(new pages.LoginPage(page)); },
  dashboardPage: async ({ page }, use) => { await use(new pages.DashboardPage(page)); },
  directoryPage: async ({ page }, use) => { await use(new pages.DirectoryPage(page)); },
  employeeManagementPage: async ({ page }, use) => { await use(new pages.EmployeeManagementPage(page)); },
  shared: async ({ page }, use) => { await use(new pages.Shared(page)); },
});

export const { Given, When, Then } = createBdd(test);
