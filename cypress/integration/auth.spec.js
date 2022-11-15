/// <reference types="Cypress" />

import { waitForVerify, getTitle } from '../support'

import user from '../fixtures/user.json'

describe('Authentication', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.viewport('macbook-16')
  })

  // Login failure
  it('should show error alert', () => {
    cy.visit('/account')
    waitForVerify()

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

    cy.contains('Username or password is incorrect.').should('exist')
  })

  // Login success
  it('should login', () => {
    cy.visit('/account')
    waitForVerify()

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
