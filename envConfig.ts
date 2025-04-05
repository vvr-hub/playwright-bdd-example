type Environment = 'prod' | 'staging' | 'local';

export const config: Record<Environment, {
  baseUrl: string;
  credentials: { username: string; password: string }
}> = {
  prod: {
    baseUrl: 'https://opensource-demo.orangehrmlive.com/',
    credentials: {
      username: 'Admin',
      password: 'admin123',
    },
  },
  staging: {
    baseUrl: 'https://staging-opensource-demo.orangehrmlive.com/', // made-up URL. Does not exist for now.
    credentials: {
      username: 'stg-username', // made-up credentials. Invalid for now. Treat these as placeholders.
      password: 'stg-password',
    },
  },
  local: {
    baseUrl: 'http://localhost:8080/', // If you're running the web application locally at port 8080 (on your machine).
    credentials: {
      username: 'local-username', // made-up credentials. Invalid for now. Treat these as placeholders.
      password: 'local-password',
    },
  },
};

// ZAP Security Testing Configuration
export const zapConfig = {
  apiUrl: process.env.ZAP_API_URL || 'http://127.0.0.1:8090', // Ensure using IPv4
};

// Get configuration based on NODE_ENV
export const getConfig = (): typeof config[Environment] => {
  const env = (process.env.NODE_ENV as Environment) || 'prod';
  return config[env];
};
