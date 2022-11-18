/// <reference types="Cypress" />

import { goto, getTitle, login } from '../../support'

import user from '../../fixtures/user.json'

describe('Authentication', () => {
  beforeEach(() => {
    cy.viewport('macbook-16')
    cy.visit('/')
  })

  afterEach(() => {
    cy.clearLocalStorage()
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
    cy.get('header').should('contain', 'Login')
    login()
    cy.get('header').should('contain', 'Account')
    cy.contains('Change Password').click()
    cy.contains('Cancel').click()
  })

  it('should logout', () => {
    cy.get('header').should('contain', 'Login')
    login()
    cy.get('header').should('contain', 'Account')
    cy.contains('Log out').click()
    cy.get('header').should('contain', 'Login')
  })

  // Check for route hiding
  it('should redirect on hidden routes', () => {
    goto('/mtg/toadvillage')
    cy.title().should('equal', 'Login')
    cy.contains('You must login to view that page.').should('exist')
  })

  // Check hidden route after login
  it('should not redirect after login', () => {
    login()
    goto('/mtg/toadvillage')
    getTitle('Toad Village')
  })
})
