@zap-security
Feature: Security Scan with OWASP ZAP

  Scenario: Perform OWASP ZAP Security Scan
    Given OWASP ZAP is running
    When I scan the website with ZAP
    Then a security report should be generated
