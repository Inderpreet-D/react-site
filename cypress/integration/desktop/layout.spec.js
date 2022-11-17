/// <reference types="Cypress" />

describe('Layout', () => {
  beforeEach(() => {
    cy.viewport('macbook-16')
  })

  it('should show Header', () => {
    cy.get('header').should('exist')
  })

  it('should have Nav', () => {
    cy.get('header')
      .get('nav')
      .should('exist')
  })

  it('should have Main', () => {
    cy.get('main').should('exist')
  })

  it('should show Footer', () => {
    cy.get('footer').should('exist')
  })
})
