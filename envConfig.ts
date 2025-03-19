type Environment = 'prod' | 'staging';

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
};

// ZAP Security Testing Configuration
export const zapConfig = {
  apiUrl: process.env.ZAP_API_URL || 'http://127.0.0.1:8090', // Ensure using IPv4
  apiKey: process.env.ZAP_API_KEY || 'ldnk6qq7bfhil2pmlfclqh7cbb', // OWASP ZAP API key
};

// Get configuration based on NODE_ENV
export const getConfig = () => {
  const env = (process.env.NODE_ENV as Environment) || 'prod';
  return config[env];
};
