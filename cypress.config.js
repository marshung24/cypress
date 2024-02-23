const { defineConfig } = require("cypress");
const { afterRunHook, beforeRunHook } = require('cypress-mochawesome-reporter/lib');

// Populate process.env with values from .env file
require('dotenv').config()

module.exports = defineConfig({
  // Use by Cypress.env('....')
  env: {
    "base-url": process.env.BASE_URL
  },
  e2e: {
    // 可以存取相對路徑並省略主機名稱和連接埠： cy.visit('/')
    // baseUrl: process.env.BASE_URL,
    setupNodeEvents(on, config) {
      // implement node event listeners here

      require('cypress-mochawesome-reporter/plugin')(on);

      on('before:run', async (details) => {
        await beforeRunHook(details);
      });

      on('after:run', async () => {
        await afterRunHook();
      });
    },
  },
  // Reporter
  reporter: 'cypress-multi-reporters',
  reporterOptions: {
    reporterEnabled: 'spec, cypress-mochawesome-reporter, mocha-junit-reporter',
    mochaJunitReporterReporterOptions: {
      mochaFile: 'cypress/reports/junit/results-[hash].xml',
    },
    cypressMochawesomeReporterReporterOptions: {
      charts: true,
      reportPageTitle: '2022 鐵人賽範例',
      embeddedScreenshots: true,
      inlineAssets: true,
      saveAllAttempts: false,
    }
  },
  video: false,
});
