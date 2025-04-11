// envConfig.ts
import prodData from './testData/prod.json';
import stagingData from './testData/staging.json';
import localData from './testData/local.json';

type Environment = 'prod' | 'staging' | 'local';

type TestData = {
  credentials: {
    username: string;
    password: string;
  };
  // You can add more types like employeeDetails, searchTerms later
};

export const config: Record<Environment, { baseUrl: string }> = {
  prod: { baseUrl: 'https://opensource-demo.orangehrmlive.com/' },
  staging: { baseUrl: 'https://staging-opensource-demo.orangehrmlive.com/' },  // made-up URL. Does not exist for now.
  local: { baseUrl: 'http://localhost:8080/' }, // If you're running the web application locally at port 8080 (on your machine).
};

// ZAP Security Testing Configuration
export const zapConfig = {
  apiUrl: process.env.ZAP_API_URL || 'http://127.0.0.1:8090',
};

// Get configuration based on NODE_ENV
export const getConfig = (): { baseUrl: string; credentials: TestData['credentials'] } => {
  const env = (process.env.NODE_ENV as Environment) || 'prod';

  const testData: TestData =
    env === 'prod' ? prodData :
    env === 'staging' ? stagingData :
    localData;

  return {
    baseUrl: config[env].baseUrl,
    credentials: testData.credentials,
  };
};
