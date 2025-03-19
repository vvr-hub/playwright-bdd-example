# Project with Playwright-BDD, TypeScript, Cukes, POM, Gherkin

## About the project

This is a **work in progress** automation test project that's built using [playwright-bdd](https://github.com/vitalets/playwright-bdd)

*  It has a few sample automated tests for a [demo website](https://opensource-demo.orangehrmlive.com/). The aim is not to cover 100% of the functionality in these tests. The coverage is minimal. Created this scalable, maintainable and robust test project in Playwright, Cucumber, TypeScript and Gherkin adopting playwright-bdd and page object model using some best practices.
*  Some tests fail if the owners of the demo Orange HRM website change or remove the functionality, items in the left side panel, GUI elements on the pages, API end-points, etc.
*  The project uses a non-existent `staging` environment to showcase environment switching capabilities.

## Features

* Page Object Pattern
* Parallelisation
* Retries for failing tests
* Rich **Reporting** with Playwright & **OWASP ZAP** Reports
* Easy Test Environment Switching
* Test Data Separation
* Cross Browser (Compatibility) Testing - Chrome, Firefox, Safari
* Tests are easy to read and understand, in (business-friendly) Given -> When -> Then format
* Tags help in easily specifying which tests to run - smoke, regression or for a specific feature
* Randomisation (Example: creates employee with random details, selects random items in dropdowns, or from enums)
* Avoids hardcoding, duplication, flakiness and sleeps
* Reusable utils and functions (step definitions)
* Automated Security Testing with **OWASP ZAP** 
* Scalability, Maintainability, Readability, Stability, Adoptability

## Project Setup

#### Prerequisites:

* Git
* VS Code (or another IDE)
* Node.js and npm (Node Package Manager)
* nvm (Node Version Manager)

#### Steps:
1. Clone the project to your local machine
   ```
   git clone https://github.com/vvr-hub/playwright-bdd-example.git
   ```
2. Change directory to `playwright-bdd-cukes-ts-hr`
   ```
   cd playwright-bdd-cukes-ts-hr
   ```
3. Install dependencies
   ```
   npm install
   ```
4. Install browsers
   ```
   npx playwright install
   ```


#### 🔒 Setting Up OWASP ZAP for Security Testing

### 1️⃣ Download and Install OWASP ZAP
- Download from the official website.
- Install it on your system.  

### 2️⃣ Set OWASP ZAP Path in `.zshrc`
For Mac, add the following to `~/.zshrc`:

```sh
export PATH=$PATH:/path/to/zap
```

For example:

```sh
export PATH=$PATH:/Applications/ZAP.app/Contents/MacOS
```

Then apply changes:

```sh
source ~/.zshrc
```

### 3️⃣ Disable API Key Authentication in ZAP

- Open **OWASP ZAP**.
- Navigate to `Tools → Options → API`.
- ✅ **Uncheck "Enable API Key"** (or check "Disable API Key").
- Click **OK** and **restart ZAP**.

### 4️⃣ Start OWASP ZAP in Daemon Mode

Run ZAP in **headless mode** (background mode) on port **8090**:

```sh
zap.sh -daemon -host 127.0.0.1 -port 8090
```
_(Windows: `zap.bat -daemon -host 127.0.0.1 -port 8090`)_

### 5️⃣ Verify ZAP API is Running

Run the following command:

```sh
curl "http://127.0.0.1:8090/JSON/core/view/version/"
```

**Expected output**:

```json
{"version":"2.16.0"}%
```


## Setting the Test Environment and Running Tests

#### Setting Environment:
Below commands are for Unix based OS (e.g., bash, **Z Shell**).
*  To set the target environment to staging environment
   ```
   export NODE_ENV=staging
   ```
* To set the target environment to prod environment
   ```
   export NODE_ENV=prod
   ```
* To see which environment is set
   ```
   echo $NODE_ENV
   ```

Below commands are for Windows OS (e.g., **PowerShell**).
*  To set the target environment to staging environment
   ```
   $env:NODE_ENV = "staging"
   ```
*  To set the target environment to prod environment
   ```
   $env:NODE_ENV = "prod"
   ```
*  To see which environment is set
   ```
   echo $env:NODE_ENV
   ```

#### Running Tests:

*  To run a specific script from `package.json`:
   ```
   npm run <script-name>
   ```
    
   **Example** (running all tests in production, parallel and headless):

   ```
   npm run prod:all:parallel:headless
   ```
   Please refer to the **scripts** section in `package.json` file for a variety of commands to run Playwright Tests, headed, headless, parallel, target browser, specific environment, smoke tests, regression tests, etc. These scripts are for Unix based OS (e.g., bash, **Z Shell**). Please modify them for Windows OS (e.g., PowerShell).


*  To run a specific Test Suite (e.g., EmployeeManagement) in Unix based OS (e.g., bash, **Z Shell**):
   ```
   NODE_ENV=prod npx bddgen --tags "@EmployeeManagement" && NODE_ENV=prod npx playwright test --headed
   ```
*  To run a specific Test (e.g., Test-3) in Unix based OS (e.g., bash, **Z Shell**):
   ```
   NODE_ENV=prod && npx bddgen --tags "@Test-3" && NODE_ENV=prod npx playwright test --headed
   ```

*  To run a specific Test Suite (e.g., EmployeeManagement) in Windows OS (e.g., PowerShell):
   ```
   NODE_ENV=prod; npx bddgen --tags "@EmployeeManagement"; NODE_ENV=prod; npx playwright test --headed
   ```
*  To run a specific Test (e.g., Test-3) in Windows OS (e.g., PowerShell):
   ```
   NODE_ENV=prod; npx bddgen --tags "@Test-3"; NODE_ENV=prod; npx playwright test --headed
   ```

#### Viewing Reports:

*  Run
   ```
   npx playwright show-report
   ```
*  Then open the following url in your browser

   `localhost:9323`


### 🚀 Running OWASP ZAP Security Test
The security test is **excluded by default.** Run it manually using:

```sh
ZAP_TEST=true NODE_ENV=prod npx bddgen --tags "@zap-security" && ZAP_TEST=true NODE_ENV=prod npx playwright test --project=chromium --retries=0 --timeout=600000
```
✔ **Retries disabled** (`--retries=0`)  
✔ **Increased timeout** (`--timeout=600000`) for the security scan  



### 📄 Viewing OWASP ZAP Security Report

Once the security test completes, open the generated report:

```sh
open zap-reports/security-report.html
```
_(Windows: `start zap-reports/security-report.html`)_


### **🔍 What Does the Security Test Cover?**
The **OWASP ZAP security test** scans for common security vulnerabilities such as:

- SQL Injection
- Cross-Site Scripting (XSS)
- Broken Authentication
- Sensitive Data Exposure
- Security Misconfigurations
- Unvalidated Redirects
- Insecure Direct Object References (IDOR)
- Broken Access Control
- Session Management Issues

It performs **spidering (crawling)** to discover web pages and endpoints, followed by **active scanning** to detect vulnerabilities.

---



## Project Structure

<img width="371" alt="image" src="https://github.com/user-attachments/assets/ad23c6eb-a48e-4ef6-bb2b-82cf37a923d7" />

-
<img width="383" alt="image" src="https://github.com/user-attachments/assets/c98326fc-bd32-4bbc-b8f0-dff7da3f5951" />



## About the project structure
Below are details about some of the key folders and files in the project:

*  `features/` - Business-friendly Tests in BDD format written in Gherkin.

*  `stepDefinitions/` - Steps which invoke the respective page functions.

*  `pages/` - Implements the actions or checks performed on each page within the web application. These functions are reusable.

*  `pageElements/` - Page-wise UI elements used by functions in the `pages` folder.

*  `constants/` - Includes constants such as API end-points that are called behind the scenes while performing tests on the application.

*  `models/` - Defines Enums and Types related to the web application. Not all may be used currently.

*  `utils/` - Contains (potentially) reusable utility functions, such as date formatting, picking values from enums, etc. These functions are not specific to the application's functionality but support testing.

*  `envConfig.ts` - Manages environment-specific configurations (e.g., base URL, login credentials, test data in future).

*  `playwright.config.ts` - Contains Playwright settings (timeouts, parallelisation, viewport, retries, screenshots, trace, etc), browser and platform coverage

*  `package.json` - Defines project dependencies (libraries) and includes scripts for setting environments and running tests.

*  `playwright-report` - Stores test reports generated by Playwright.

*  `pageIndex.ts` and `fixtures.ts` - Provided by the playwright-bdd framework
The individual Page Object Models (POMs) defined in separate pages in the pages folder are imported in pageIndex.ts file. It then re-exports them from this single access point (Centralised Exports). The fixtures.ts file imports all POMs from pageIndex.ts file, instantiates them and provides the (reusable) instances to step definitions.

*  `utils/zapHelper.ts` - **Handles OWASP ZAP API communication** for security scanning.

*  `zap-reports/` - Stores **OWASP ZAP-generated security reports.**


## Acknowledgement and Thanks
*  **Vitalets playwright-bdd example** project has been very useful in creating this project.
*  The demo website for **Orange HR Management web application** has been very useful for writing sample tests in this project
