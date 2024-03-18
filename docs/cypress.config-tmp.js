const { defineConfig } = require("cypress");

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
      reportPageTitle: 'Report Title',
      embeddedScreenshots: true,
      inlineAssets: true,
      saveAllAttempts: false,
    }
  },
});
