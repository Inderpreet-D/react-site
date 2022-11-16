/// <reference types="Cypress" />

import { goto, getTitle } from '../support'

import user from '../fixtures/user.json'

describe('Authentication', () => {
  beforeEach(() => {
    cy.viewport('macbook-16')
  })

  // Login failure
  it('should show error alert', () => {
    goto('/account')

    cy.contains('Username')
      .click()
      .type(user.username)

    // Select password input
    cy.get('body')
      .tab()
      .tab()

    cy.focused()
      .type(user.invalidPassword)
      .type('{enter}')

    cy.contains('Username or password is incorrect.')
      .should('exist')
      .wait(5000)
      .should('not.exist')
  })

  // Login success
  it('should login', () => {
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
  })
})
