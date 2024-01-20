const { defineConfig } = require("cypress");

// Populate process.env with values from .env file
require('dotenv').config()

module.exports = defineConfig({
  // Cypress.env('....')
  env: {
    
  },
  e2e: {
    // 可以存取相對路徑並省略主機名稱和連接埠： cy.visit('/')
    // baseUrl: process.env.BASE_URL,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
