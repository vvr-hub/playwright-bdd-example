@Dashboard
Feature: OrangeHRM Dashboard

  Background: Successful Login
    Given I am on the OrangeHRM login page
    And I enter valid username and password to Login
    When I should land on the Dashboard

  @smoke @Test-9
  Scenario: Verify Dashboard Header
    Then I should see the "Dashboard" header

  @regression @Test-10
  Scenario: Check Quick Launch Panel
    Then I should see the Quick Launch panel with 6 icons

  @regression @Test-11
  Scenario: Verify User Dropdown
    Then I click on the user dropdown
    And I should see the "Logout" option

  @regression @Test-12
  Scenario: Navigate to Admin Page from Dashboard page
    Then I click on the "Admin" item in the left panel
    And I should be navigated to the Admin page
