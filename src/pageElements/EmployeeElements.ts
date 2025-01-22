import { Page } from "@playwright/test";

export class EmployeeElements {
    constructor(public page: Page) { }

    // Navigation Elements
    pimHeader = this.page.getByRole('heading', { name: 'PIM' });
    tabInPIM = (label: string) => this.page.getByRole('link', { name: label });
    jobLink = this.page.getByRole('link', { name: 'Job' });
    jobDetailsHeader = this.page.getByRole('heading', { name: 'Job Details' });

    // Add Employee Elements
    addEmployeeHeader = this.page.getByRole('heading', { name: 'Add Employee' });
    saveButton = this.page.getByRole('button', { name: 'Save' });

    // Employee List Elements
    employeeNameFilter = this.page.getByPlaceholder('Type for hints...').first();
    searchingProgressLabel = this.page.getByRole('option', { name: 'Searching....' });
    employeeIdFilter = this.page.locator("//label[text()='Employee Id']/parent::*[contains(@class,'label-wrapper')]/following-sibling::div/input");
    noRecordsFoundMsg = this.page.locator('span').filter({ hasText: 'No Records Found' });
    oneRecordFoundHeader = this.page.getByText('(1) Record Found');

    // Employee Details Elements
    employeeInfoHeader = this.page.getByText('Employee Information');
    personalDetailsHeader = this.page.getByRole('heading', { name: 'Personal Details' });
    firstNameInputBox = this.page.getByPlaceholder('First Name');
    lastNameInputBox = this.page.getByPlaceholder('Last Name');
    employeeIdInputBox = this.page.locator("//label[text()='Employee Id']/parent::div/following-sibling::div/input");
    joinedDateInputBox = this.page.locator("//label[text()='Joined Date']/parent::*[contains(@class, 'label-wrapper')]/following-sibling::div//input[@placeholder]");
    fieldDropdown = (field: string) => this.page.locator(`//label[text()='${field}']/parent::div/following-sibling::div//i`);
    dropdownOption = (optionLabel: string) => this.page.getByRole('option', { name: optionLabel });
    lastOptionInDropdown = this.page.getByRole('listbox').getByRole('option').last();
    noRecordsFoundItemInDropdown = this.page.getByRole('option', { name: 'No Records Found' });
    saveJobDetailsButton = this.page.getByRole('button', { name: 'Save' }).first();

    // Employee Details Row Elements
    employeeBasicDetailsRow = (employeeId: string, firstName: string, lastName: string) =>
        this.page.getByRole('row', { name: `${employeeId} ${firstName} ${lastName}` });
    employeeAndJobDetailsRow = (employeeId: string, firstName: string, lastName: string, jobTitle: string, employmentStatus: string, subUnit: string) =>
        this.page.getByRole('row', { name: `${employeeId} ${firstName} ${lastName} ${jobTitle} ${employmentStatus} ${subUnit}` });

    // Edit/Delete Employee Elements
    editEmployeeDetailsButton = (employeeId: string, firstName: string, lastName: string) =>
        this.page.getByRole('row', { name: `${employeeId} ${firstName} ${lastName}` }).getByRole('button').first();
    deleteEmployeeDetailsButton = (employeeId: string, firstName: string, lastName: string) =>
        this.page.getByRole('row', { name: `${employeeId} ${firstName} ${lastName}` }).getByRole('button').last();

    // Employee Name Display
    employeeNameHeader = (firstName: string, lastName: string) => this.page.getByRole('heading', { name: `${firstName} ${lastName}` });

    // Toasts
    successfullySavedToastMsg = this.page.getByText('Successfully Saved');
    successfullyUpdatedToastMsg = this.page.getByText('Successfully Updated');
    successfullyDeletedToastMsg = this.page.getByText('Successfully Deleted', { exact: true });

    // Delete Confirmation Modal
    deleteEmployeeModalHeader = this.page.getByText('Are you Sure?');
    deleteEmployeeModalBody = this.page.getByText('The selected record will be permanently deleted. Are you sure you want to continue?');
    cancelDeleteButton = this.page.getByRole('button', { name: 'No, Cancel' });
    confirmDeleteButton = this.page.getByRole('button', { name: 'Yes, Delete' });
    closeModalButton = this.page.getByRole('button', { name: '×' });
}