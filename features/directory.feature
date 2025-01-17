@Directory
Feature: OrangeHRM Directory

  Background: Successful Login and clicking the Directory item
    Given I am on the OrangeHRM login page
    And I enter valid username and password to Login
    And I should land on the Dashboard
    When I click on the "Directory" item in the left panel

  @smoke @Test-7
  Scenario: Verify Directory Page
    Then I should be navigated to the Directory page
    And there are filters for Employee Name, Job Title and Location

  @regression @Test-8
  Scenario: Search with no result
    Then I enter employee name "NonExistingUser"
    And I should see no records found
