/// <reference types="Cypress" />

describe('Navigation', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should show 404', () => {
    cy.visit('/adwas', { failOnStatusCode: false })

    cy.get('h1').should('have.text', 'Page Not Found')
  })
})
