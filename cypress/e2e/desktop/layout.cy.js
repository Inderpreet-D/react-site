/// <reference types="Cypress" />

import { goto } from '../../support/e2e'

describe('Layout', () => {
  beforeEach(() => {
    cy.viewport('macbook-16')
    goto('/')
  })

  it('should show Header', () => {
    cy.get('header').should('exist')
  })

  it('should have Nav', () => {
    cy.get('header').get('nav').should('exist')
  })

  it('should have Main', () => {
    cy.get('main').should('exist')
  })

  it('should show Footer', () => {
    cy.get('footer').should('exist')
  })
})
