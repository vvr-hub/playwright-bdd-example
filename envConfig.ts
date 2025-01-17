type Environment = 'prod' | 'staging';

export const config: Record<Environment, { baseUrl: string; credentials: { username: string; password: string } }> = {
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
      username: 'stg-username', // made-up credentials. Invalid for now.
      password: 'stg-password',
    },
  },
};

// Get configuration based on NODE_ENV
export const getConfig = () => {
  const env = (process.env.NODE_ENV as Environment) || 'prod';
  return config[env];
};
