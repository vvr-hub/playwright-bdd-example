@Login
Feature: OrangeHRM Login

  @smoke @Test-1
  Scenario: Successful Login with Valid Credentials
    Given I am on the OrangeHRM login page
    When I enter valid username and password to Login
    Then I should land on the Dashboard

  @regression @Test-2
  Scenario Outline: Login with Invalid Credentials
    Given I am on the OrangeHRM login page
    When I enter username "<username>" and password "<password>" to Login
    Then I should see an invalid login error message

    Examples:
      | username | password |
      | invalid  | admin123 |
      | Admin    | invalid  |
