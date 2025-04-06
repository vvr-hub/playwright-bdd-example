Feature: Accessibility Compliance

  @Test-13
  Scenario: Check accessibility on the Login page
    Given I am on the OrangeHRM login page
    Then the page should have no accessibility violations
