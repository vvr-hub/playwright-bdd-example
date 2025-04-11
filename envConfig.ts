// envConfig.ts

import prodData from './testData/prod.json';
import stagingData from './testData/staging.json';
import localData from './testData/local.json';

type Environment = 'prod' | 'staging' | 'local';

export type TestData = {
  credentials: {
    username: string;
    password: string;
  };
  // Extend here later as more test data gets added.
};

export const config: Record<Environment, { baseUrl: string }> = {
  prod: { baseUrl: 'https://opensource-demo.orangehrmlive.com/' },
  staging: { baseUrl: 'https://staging-opensource-demo.orangehrmlive.com/' }, // made-up URL. Does not exist for now.
  local: { baseUrl: 'http://localhost:8080/' }, // If you're running the web application locally at port 8080 (on your machine).
};

// 🔒 ZAP Security Testing Configuration
export const zapConfig = {
  apiUrl: process.env.ZAP_API_URL || 'http://127.0.0.1:8090',
};

// ✅ Returns configuration based on NODE_ENV
export const getConfig = (): { baseUrl: string } => {
  const env = (process.env.NODE_ENV as Environment) || 'prod';
  return { baseUrl: config[env].baseUrl };
};

// ✅ Returns environment-specific test data (credentials, etc)
export const getTestData = (): TestData => {
  const env = (process.env.NODE_ENV as Environment) || 'prod';

  return env === 'prod'
    ? prodData
    : env === 'staging'
      ? stagingData
      : localData;
};
