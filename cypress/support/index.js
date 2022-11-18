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

import user from '../fixtures/user.json'

export const goto = (path, ...args) => {
  cy.visit(path, ...args)
  cy.location('pathname', { timeout: 60000 }).should('include', path)
}

export const getTitle = text => {
  return cy.get('[data-cy=title]').should('have.text', text)
}

export const login = () => {
  goto('/account')

  cy.contains('Username')
    .click()
    .type(user.username)

  // Select password input
  cy.get('body')
    .tab()
    .tab()

  cy.focused()
    .type(user.password)
    .type('{enter}')

  getTitle('My Account')
}
