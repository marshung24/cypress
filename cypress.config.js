const { defineConfig } = require("cypress");

// Populate process.env with values from .env file
require('dotenv').config()

console.log(process.env.BASE_URL);

module.exports = defineConfig({
  // Use by Cypress.env('....')
  env: {

  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here

      // Import Event Config - cypress-mochawesome-reporter
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
  // Reporter
  reporter: 'cypress-multi-reporters',
  reporterOptions: {
    reporterEnabled: 'cypress-mochawesome-reporter, mocha-junit-reporter',
    mochaJunitReporterReporterOptions: {
      mochaFile: 'cypress/reports/junit/results-[hash].xml',
    },
    cypressMochawesomeReporterReporterOptions: {
      charts: true,
      reportPageTitle: 'Report',
      embeddedScreenshots: true,
      inlineAssets: true,
      saveAllAttempts: false,
    }
  },
});
