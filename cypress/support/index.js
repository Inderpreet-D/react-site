// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')
import '@cypress/code-coverage/support'

import 'cypress-plugin-tab'

const waitForVerify = () => {
  cy.get('#page-spinner').should('not.exist', { timeout: 10000 })
}

export const goto = (...args) => {
  cy.visit(...args)
  waitForVerify()
}

export const getTitle = text =>
  cy.get('[data-cy=title]').should('have.text', text)
