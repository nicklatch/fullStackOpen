import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    // eslint-disable-next-line no-unused-vars
    setupNodeEvents(on, config) {},
    baseUrl: 'http://localhost:5173',
  },
  env: {
    BACKEND: 'http://localhost:3001/api',
  },
});
