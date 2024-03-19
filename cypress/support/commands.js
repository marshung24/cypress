// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


/**
 * Caching session when logging in via page visit
 */
Cypress.Commands.overwrite('loginByPage', (originalFn, url, options) => {
    cy.session(name, () => {
        cy.visit('https://mars7-cloud.rd1.nueip.site/?hrm_login=auth_code')
        cy.get('[data-test=inputCompany]').type(name)
        cy.get('[data-test=password]').type('s3cr3t')
        cy.get('[data-test=password]').type('s3cr3t')
        cy.get('form').contains('Log In').click()
        cy.url().should('contain', '/login-successful')
    })
});

/**
 * Caching session when logging in via API
 */
Cypress.Commands.overwrite('loginByAPI', (originalFn, url, options) => {
    cy.session(username, () => {
        cy.request({
            method: 'POST',
            url: '/login',
            body: { username, password },
        }).then(({ body }) => {
            window.localStorage.setItem('authToken', body.token)
        })
    })
});

