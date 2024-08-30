/// <reference types="Cypress" />

import { goto } from '../../support/e2e'

describe('Home', () => {
  beforeEach(() => {
    cy.viewport('macbook-16')
    goto('/')
  })

  it('should show publications', () => {
    cy.contains('Publications').click()

    cy.contains(
      'A Novel Training Program to Improve Human Spatial Orientation: Preliminary Findings'
    ).should('exist')

    cy.get('button[aria-label="Forward"]').click()

    cy.contains(
      'Body illusion and affordances: the influence of body representation on a walking imagery task in virtual reality'
    )
  })

  it('should move between sections', () => {
    cy.contains('Experience').click()

    cy.contains('1 / 4').should('exist')

    cy.contains('Education').click()

    cy.contains('University of Calgary').should('exist')

    cy.contains('Technologies').click()

    cy.contains('Web Development').should('exist')

    cy.contains('Languages').click()

    cy.contains('JavaScript').should('exist')
  })
})
