import { Given, When, Then } from './fixtures';
import { IEmployeeDetails } from '../../src/models/employeeDetails';

let employeeDetails: IEmployeeDetails;

Given(/^I should be navigated to the Employee List page$/, async ({ employeeManagementPage }) => {
  await employeeManagementPage.verifyEmployeeListPageNavigation();
});

When(/^I navigate to the "(.+)" tab$/, async ({ employeeManagementPage }, label) => {
  await employeeManagementPage.goToTabInPIM(label);
});

When('I add a new employee with random details', async ({ employeeManagementPage }) => {
  employeeDetails = await employeeManagementPage.addEmployee();
});

When('I see the personal details of the employee added', async ({ employeeManagementPage }) => {
  await employeeManagementPage.verifyEmployeePersonalDetails(employeeDetails);
});

Then('I search for the employee', async ({ employeeManagementPage }) => {
  await employeeManagementPage.searchForEmployee(employeeDetails);
});

Then('I search for the employee by employeeId', async ({ employeeManagementPage }) => {
  await employeeManagementPage.searchForEmployee(employeeDetails, 'employeeId');
});

Then('I should see the employee listed in the employee list', async ({ employeeManagementPage }) => {
  await employeeManagementPage.verifyEmployeeListed(employeeDetails);
});

Then('there are options to edit and delete the employee', async ({ employeeManagementPage }) => {
  await employeeManagementPage.verifyEmployeeEditAndDeleteOptionsExist(employeeDetails);
});

Then('I delete this employee', async ({ employeeManagementPage }) => {
  await employeeManagementPage.deleteEmployee(employeeDetails);
});

Then('I cannot find the deleted employee in the search', async ({ employeeManagementPage }) => {
  await employeeManagementPage.verifyDeletedEmployeeIsNotFound();
});

Then('I navigate to job details section for the employee', async ({ employeeManagementPage }) => {
  await employeeManagementPage.navigateToJobDetailsSection();
});

Then('I add the job details of the employee', async ({ employeeManagementPage }) => {
  employeeDetails = await employeeManagementPage.addJobDetailsOfEmployee(employeeDetails);
});

Then('I should see the employee listed in the employee list with job details', async ({ employeeManagementPage }) => {
  await employeeManagementPage.verifyEmployeeListedWithJobDetails(employeeDetails);
});
