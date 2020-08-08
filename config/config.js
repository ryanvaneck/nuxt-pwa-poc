const allConfig = {
  development: {
    api: {
      host: 'http://localhost:3001'
    }
  },
  production: {
    api: {
      host: 'http://localhost:3001'
    }
  }
};

const config = allConfig[process.env.NODE_ENV];
export default config;
