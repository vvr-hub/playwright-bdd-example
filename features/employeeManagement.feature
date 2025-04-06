@EmployeeManagement
Feature: OrangeHRM PIM (Personnel Information Management)

  Background: Successful Login and Employee creation
    Given I am on the OrangeHRM login page
    And I enter valid username and password to Login
    And I should land on the Dashboard
    And I click on the "PIM" item in the left panel
    And I should be navigated to the Employee List page
    And I navigate to the "Add Employee" tab
    And I add a new employee with random details
    And I see the personal details of the employee added

  @smoke @Test-3
  Scenario: Add a new employee
    When I navigate to the "Employee List" tab
    And I search for the employee
    Then I should see the employee listed in the employee list
    And there are options to edit and delete the employee

  @regression @Test-4
  Scenario: Delete an employee
    When I navigate to the "Employee List" tab
    And I search for the employee
    And I should see the employee listed in the employee list
    And there are options to edit and delete the employee
    And I delete this employee
    And I search for the employee
    Then I cannot find the deleted employee in the search

  @regression @Test-5
  Scenario: Update an employee by adding Job Details
    When I navigate to job details section for the employee
    And I add the job details of the employee
    And I navigate to the "Employee List" tab
    And I search for the employee
    Then I should see the employee listed in the employee list with job details

  @regression @Test-6
  Scenario: Search an employee by employeeId
    When I navigate to the "Employee List" tab
    And I search for the employee by employeeId
    Then I should see the employee listed in the employee list

  @a11y @regression @Test-16
  Scenario: Check accessibility - Employee Personal Details page
    Then the page should have no accessibility violations