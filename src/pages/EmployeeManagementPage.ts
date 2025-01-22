import { expect, Page } from '@playwright/test';
import { faker } from '@faker-js/faker';
import assert from 'assert'; // Used for an alternative way to fail a test with a meaningful message.

import { EmploymentStatus } from '../models/employment-status.enum';
import { IEmployeeDetails } from '../models/employeeDetails';

import { SharedElements } from "../pageElements/SharedElements";
import { EmployeeElements } from "../pageElements/EmployeeElements";

import { getFormattedDate } from '../utils/date-formatter';
import { getRandomEnumValue } from '../utils/random-enum-utils';

import { API_ENDPOINTS } from '../constants/apiEndpoints';

export default class EmployeeManagementPage {
  elements = new EmployeeElements(this.page);
  sharedElements = new SharedElements(this.page);
  constructor(public page: Page) { }

  async verifyEmployeeListPageNavigation() {
    await expect(this.elements.employeeInfoHeader).toBeVisible();
    await expect(this.page).toHaveURL(/web\/index.php\/pim\/viewEmployeeList/);
    await expect(this.elements.pimHeader).toBeVisible();
  }

  async goToTabInPIM(label: string): Promise<void> {
    await this.elements.tabInPIM(label).click();
  }

  async addEmployee(): Promise<IEmployeeDetails> {
    // Generating random personal details. No hard-coding.
    const employeeId = faker.number.int({ min: 10000, max: 99999 }).toString();
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();

    // Specifying in advance the API calls which are triggered when we add a new employee
    const responsePromise1 = this.page.waitForResponse(response =>
      response.url().endsWith(API_ENDPOINTS.EMPLOYEE_MANAGEMENT.ADD_EMPLOYEE) &&
      response.status() === 200 &&
      response.request().method() === 'POST'
    );

    const responsePromise2 = this.page.waitForResponse(response =>
      response.url().includes(API_ENDPOINTS.EMPLOYEE_MANAGEMENT.GET_PERSONAL_DETAILS) &&
      response.status() === 200 &&
      response.request().method() === 'GET'
    );

    const responsePromise3 = this.page.waitForResponse(response =>
      response.url().endsWith(API_ENDPOINTS.EMPLOYEE_MANAGEMENT.GET_PERSONAL_DETAILS_ALT) &&
      response.status() === 200 &&
      response.request().method() === 'GET'
    );

    const responsePromise4 = this.page.waitForResponse(response =>
      response.url().endsWith(API_ENDPOINTS.EMPLOYEE_MANAGEMENT.GET_ALL_EMPLOYEES) &&
      response.status() === 200 &&
      response.request().method() === 'GET'
    );

    // Fill and submit the form.
    await expect(this.elements.addEmployeeHeader).toBeVisible();
    await this.elements.firstNameInputBox.fill(firstName);
    await this.elements.lastNameInputBox.fill(lastName);
    await this.elements.employeeIdInputBox.fill(employeeId);
    await this.elements.saveButton.click();
    await expect(this.sharedElements.loader).toBeVisible(); // Verify a loader appears when form is submitted
    await expect(this.elements.successfullySavedToastMsg).toBeVisible();
    await expect(this.elements.personalDetailsHeader).toBeVisible();

    // Wait for API responses to be received correctly before proceeding
    await responsePromise1;
    await responsePromise2;
    await responsePromise3;
    await responsePromise4;

    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForLoadState('networkidle');
    await expect(this.sharedElements.loader).toHaveCount(0); // Wait for the loader(s) to disappear.
    return { employeeId, firstName, lastName };
  }

  async verifyEmployeePersonalDetails(employeeDetails: IEmployeeDetails): Promise<void> {
    await expect(this.elements.personalDetailsHeader).toBeVisible();
    const { employeeId, firstName, lastName } = this.getEmployeeDetails(employeeDetails);
    await expect(this.elements.employeeNameHeader(firstName, lastName)).toBeVisible();
    await expect(this.elements.firstNameInputBox).toBeEnabled();
    await expect(this.elements.firstNameInputBox).toBeEditable();

    expect(await this.elements.firstNameInputBox.inputValue()).toEqual(firstName);
    expect(await this.elements.lastNameInputBox.inputValue()).toEqual(lastName);
    expect(await this.elements.employeeIdInputBox.inputValue()).toEqual(employeeId);
  }

  async verifyEmployeeListed(employeeDetails: IEmployeeDetails): Promise<void> {
    const { employeeId, firstName, lastName } = this.getEmployeeDetails(employeeDetails);
    await expect(this.elements.oneRecordFoundHeader).toBeVisible();
    await expect(
      this.elements.employeeBasicDetailsRow(employeeId, firstName, lastName)
    ).toBeVisible();
  }

  async verifyEmployeeEditAndDeleteOptionsExist(employeeDetails: IEmployeeDetails) {
    const { employeeId, firstName, lastName } = this.getEmployeeDetails(employeeDetails);
    await expect(this.elements.editEmployeeDetailsButton(employeeId, firstName, lastName)).toBeVisible();
    await expect(this.elements.deleteEmployeeDetailsButton(employeeId, firstName, lastName)).toBeVisible();
  }

  async verifyEmployeeListedWithJobDetails(employeeDetails: IEmployeeDetails): Promise<void> {
    const { employeeId, firstName, lastName } = this.getEmployeeDetails(employeeDetails);
    await expect(this.elements.oneRecordFoundHeader).toBeVisible();
    if (employeeDetails.jobTitle && employeeDetails.employmentStatus && employeeDetails.subUnit) {
      await expect(
        this.elements.employeeAndJobDetailsRow(
          employeeId,
          firstName,
          lastName,
          employeeDetails.jobTitle,
          employeeDetails.employmentStatus,
          employeeDetails.subUnit
        )
      ).toBeVisible();
    } else {
      expect(false, "Job Details have not been successfully added to the employee").toBe(true); // Fail the test with a meaningful message
      // assert.fail("Job Details have not been successfully added to the employee"); // Alternative method.
    }
  }

  async navigateToJobDetailsSection() {
    await this.elements.jobLink.click();
    await expect(this.elements.jobDetailsHeader).toBeVisible();
  }

  async addJobDetailsOfEmployee(employeeDetails: IEmployeeDetails): Promise<IEmployeeDetails> {
    // Specifying in advance the API calls which are triggered when we add job details for an employee
    const responsePromise1 = this.page.waitForResponse(response => {
      const url = response.url();
      const regex = API_ENDPOINTS.EMPLOYEE_MANAGEMENT.UPDATE_JOB_DETAILS; // Regex matching the end-point
      return regex.test(url) && response.status() === 200 && response.request().method() === 'PUT';
    });

    const responsePromise2 = this.page.waitForResponse(response => {
      const url = response.url();
      const regex = API_ENDPOINTS.EMPLOYEE_MANAGEMENT.UPDATE_EMPLOYMENT_CONTRACT; // Regex matching the end-point
      return regex.test(url) && response.status() === 200 && response.request().method() === 'PUT';
    });

    // The format of the date expected by the 'Joined Date' input box keeps changing.
    if (await this.elements.joinedDateInputBox.isVisible()) {
      const expectedDateFormatForJoinedDate = await this.elements.joinedDateInputBox.getAttribute('placeholder');
      if (expectedDateFormatForJoinedDate) {
        await this.elements.joinedDateInputBox.fill(getFormattedDate(expectedDateFormatForJoinedDate));
      }
    }

    // Selecting an item randomly from the 'Employee Status' enum. Not hard-coding a specific Employee Status.
    const randomEmploymentStatus = getRandomEnumValue(EmploymentStatus);
    await this.elements.fieldDropdown('Employment Status').click();
    await this.elements.dropdownOption(randomEmploymentStatus).click();
    employeeDetails.employmentStatus = randomEmploymentStatus;

    // As the items in these drop-downs keep changing, it is not possible to select random items from enums.
    // So, selecting the last item in these dropdowns. Still not hard-coding specific values/items here.
    employeeDetails.jobTitle = await this.selectLastOptionInFieldDropdown('Job Title');
    employeeDetails.subUnit = await this.selectLastOptionInFieldDropdown('Sub Unit');
    employeeDetails.jobCategory = await this.selectLastOptionInFieldDropdown('Job Category');
    employeeDetails.location = await this.selectLastOptionInFieldDropdown('Location');

    await this.elements.saveJobDetailsButton.click();

    // Wait for API responses to be received correctly before proceeding
    await responsePromise1;
    await responsePromise2;

    await expect(this.elements.successfullyUpdatedToastMsg).toBeVisible();
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForLoadState('networkidle');
    await expect(this.sharedElements.loader).toHaveCount(0);

    return employeeDetails;
  }

  async deleteEmployee(employeeDetails: IEmployeeDetails) {
    const { employeeId, firstName, lastName } = this.getEmployeeDetails(employeeDetails);

    // Specifying in advance the API call which is triggered when we delete an employee
    const responsePromise = this.page.waitForResponse(response =>
      response.url().endsWith(API_ENDPOINTS.EMPLOYEE_MANAGEMENT.DELETE_EMPLOYEE) &&
      response.status() === 200 &&
      response.request().method() === 'DELETE'
    );

    await this.elements.deleteEmployeeDetailsButton(employeeId, firstName, lastName).click();
    // Verify the 'Delete Employee' modal, and confirm deletion.
    await expect(this.elements.deleteEmployeeModalHeader).toBeVisible();
    await expect(this.elements.deleteEmployeeModalBody).toBeVisible();
    await expect(this.elements.cancelDeleteButton).toBeVisible();
    await expect(this.elements.closeModalButton).toBeVisible();
    await this.elements.confirmDeleteButton.click();
    await expect(this.elements.deleteEmployeeModalHeader).not.toBeVisible();
    await expect(this.sharedElements.loader).toBeVisible();

    await responsePromise; // Wait for API response to be received correctly before proceeding
    await expect(this.elements.successfullyDeletedToastMsg).toBeVisible();
  }

  async verifyDeletedEmployeeIsNotFound(): Promise<void> {
    await expect(this.elements.employeeInfoHeader).toBeVisible();
    await expect(this.elements.noRecordsFoundMsg).toBeVisible();
  }

  async searchForEmployee(employeeDetails: IEmployeeDetails, filterBy = 'employeeName') {
    await expect(this.elements.employeeInfoHeader).toBeVisible();

    // Specifying in advance the API call which is triggered when we search an employee
    const responsePromise = this.page.waitForResponse(response =>
      response.url().endsWith(API_ENDPOINTS.EMPLOYEE_MANAGEMENT.GET_FILTERED_EMPLOYEES) &&
      response.status() === 200 &&
      response.request().method() === 'GET'
    );

    const { employeeId, firstName, lastName } = this.getEmployeeDetails(employeeDetails);

    // Enter either employeeId or employee name for the search.
    if (filterBy === 'employeeId') {
      await this.elements.employeeIdFilter.fill(employeeId);
      expect(await this.elements.employeeIdFilter.inputValue()).toEqual(employeeId);
    } else {
      await this.elements.employeeNameFilter.fill(`${firstName} ${lastName}`);
      expect(await this.elements.employeeNameFilter.inputValue()).toEqual(`${firstName} ${lastName}`);
      await expect(this.elements.searchingProgressLabel).toBeVisible();
      await expect(this.elements.searchingProgressLabel).not.toBeVisible();
    }
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForLoadState('networkidle');

    // Initiate the Search once ready. Then wait for the search to complete.
    await expect(this.sharedElements.searchButton).toBeEnabled();
    await this.sharedElements.searchButton.focus();
    await this.sharedElements.searchButton.click({ force: true });

    await expect(this.sharedElements.loader).toBeVisible();
    await expect(this.sharedElements.loader).toHaveCount(0);

    await responsePromise; // Wait for API response to be received correctly before proceeding

    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForLoadState('networkidle');
  }

  async selectLastOptionInFieldDropdown(fieldName: string): Promise<string | undefined> {
    await this.elements.fieldDropdown(fieldName).click();
    let lastOptionText;
    // Verify there are items in the dropdown, and select one item. If no items exist, fail the test.
    if (await this.elements.noRecordsFoundItemInDropdown.isHidden()) {
      lastOptionText = await this.elements.lastOptionInDropdown.textContent() ?? undefined;
      await this.elements.lastOptionInDropdown.click();
    } else {
      expect(false, `${fieldName} options have been removed by the website owner`).toBe(true); // Fail the test with a meaningful message
      // assert.fail(`${fieldName} options have been removed by the website owner`); // Alternative method.
    }
    return lastOptionText;
  }

  getEmployeeDetails(employeeDetails: IEmployeeDetails): IEmployeeDetails {
    return {
      employeeId: employeeDetails.employeeId,
      firstName: employeeDetails.firstName,
      lastName: employeeDetails.lastName,
    };
  }
}