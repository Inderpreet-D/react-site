/// <reference types="Cypress" />

import { goto, login } from '../../support'

describe('MTG', () => {
  beforeEach(() => {
    cy.viewport('macbook-16')
    goto('/mtg')
  })

  // Check back button
  it('should go between pages', () => {
    cy.contains('Competitive').click()

    cy.get('button[aria-label="Back"]').click()

    cy.contains('MTG Hub').should('exist')
  })

  // Check cards
  it('should show and interact with cards', () => {
    login()
    goto('/mtg/toadvillage')

    cy.intercept('POST', '/api/toadvillage').as('cardSearch')

    cy.contains('Import Deck List').click()
    cy.focused().type('1 Forest')
    cy.contains('Submit').click()

    cy.contains('Total Cards (1)', { timeout: 5000 }).should('exist')
    cy.contains('Deck (1)').should('exist')
    cy.contains('Commander Options / Sideboard (0)').should('exist')

    const getCard = () => cy.get('[data-cy="Forest"]')
    const getCardButtons = () => getCard().find('button')

    getCard().should('exist')

    getCard()
      .contains('1')
      .should('exist')
    getCardButtons()
      .first()
      .click()
    getCard()
      .contains('0')
      .should('exist')

    getCardButtons()
      .first()
      .next()
      .next()
      .click()
      .click()
    getCard()
      .contains('2')
      .should('exist')

    getCardButtons()
      .first()
      .next()
      .click()
    cy.contains('Commander Options / Sideboard (2)').should('exist')
  })
})
