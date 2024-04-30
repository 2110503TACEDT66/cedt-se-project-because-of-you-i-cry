// cypress configuration file, in my case cypress.config.ts

import { defineConfig } from 'cypress';
import SSRLocalhostMocker from 'cypress-ssr-localhost-mocker'; // import library

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
     
    },
  },
});