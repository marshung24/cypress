/**
 * e2e-run-tests.js
 * 
 * Run by: node e2e-run-tests.js
 */
const cypress = require('cypress')

// Populate process.env with values from .env file
require('dotenv').config()

cypress.run({
  reporter: 'junit',
  browser: 'chrome',
  spec: './cypress/e2e/1-getting-started/*',
  //spec: './cypress/e2e/**/api*.js',
  config: {
    // Use by Cypress.env('....')
    env: {
      "base-url" : process.env.BASE_URL
    },
    e2e: {
      // 可以存取相對路徑並省略主機名稱和連接埠： cy.visit('/')
      // baseUrl: process.env.BASE_URL,
      setupNodeEvents(on, config) {
        // implement node event listeners here
      },
    },
  },
  env: {
    login_url: '/login',
    products_url: '/products',
  },
})
.then((results) => {
  console.log(results)
})
.catch((err) => {
  console.error(err)
})