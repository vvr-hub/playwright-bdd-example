export const API_ENDPOINTS = {
    AUTHENTICATION: {
        VALIDATE_LOGIN: '/auth/validate',
    },
    EMPLOYEE_MANAGEMENT: {
        ADD_EMPLOYEE: '/api/v2/pim/employees',
        GET_PERSONAL_DETAILS: '/pim/viewPersonalDetails/empNumber/',
        GET_PERSONAL_DETAILS_ALT: '/personal-details',
        GET_ALL_EMPLOYEES: '/api/v2/pim/employees',

        UPDATE_JOB_DETAILS: /\/api\/v2\/pim\/employees\/\d+\/job-details$/, // Regex matching the end-point
        UPDATE_EMPLOYMENT_CONTRACT: /\/api\/v2\/pim\/employees\/\d+\/employment-contract$/, // Regex

        GET_FILTERED_EMPLOYEES: '&includeEmployees=onlyCurrent&sortField=employee.firstName&sortOrder=ASC',

        DELETE_EMPLOYEE: '/api/v2/pim/employees',
    }
};
