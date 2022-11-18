/// <reference types="Cypress" />

import { getTitle, goto, login } from '../../support'

describe('MTG', () => {
  beforeEach(() => {
    cy.viewport('macbook-16')
    goto('/mtg')
  })

  // Check back button
  it('should go between pages', () => {
    cy.contains('Competitive').click()

    cy.get('[aria-label="Back"]', { timeout: 10000 }).click()

    cy.location('pathname', { timeout: 60000 })
      .should('include', '/mtg')
      .should('not.include', '/competitive')
  })

  // Check cards
  it('should show and interact with cards', () => {
    login()
    goto('/mtg/toadvillage')

    cy.contains('Import Deck List').click()
    cy.focused().type('1 Forest')
    cy.contains('Submit').click()

    cy.contains('Total Cards (1)', { timeout: 5000 }).should('exist')
    cy.contains('Deck (1)').should('exist')
    cy.contains('Commander Options / Sideboard (0)').should('exist')

    const getCard = () => cy.get('[data-cy="Forest"]')
    const getCardButtons = () => getCard().find('button')

    getCard().should('exist')

    // Decrement
    getCard()
      .contains('1')
      .should('exist')
    getCardButtons()
      .first()
      .click({ force: true })
    getCard()
      .contains('0')
      .should('exist')

    // Increment
    getCardButtons()
      .first()
      .next()
      .next()
      .click()
      .click({ force: true })
    getCard()
      .contains('2')
      .should('exist')

    // Move
    getCardButtons()
      .first()
      .next()
      .click({ force: true })
    cy.contains('Commander Options / Sideboard (2)').should('exist')
  })

  // Check that errors show
  it('should show error on invalid cards', () => {
    login()
    goto('/mtg/toadvillage')

    // Close dialog
    cy.contains('Import Deck List').click()
    cy.contains('Enter Decklist').should('exist')
    cy.contains('Cancel').click()
    cy.contains('Enter Decklist').should('not.exist')

    // Click back drop
    cy.contains('Import Deck List').click()
    cy.get('body').click(10, 10)
    cy.contains('Enter Decklist').should('not.exist')

    // Submit invalid
    cy.contains('Import Deck List').click()
    cy.focused().type('1 INVALID_CARD')
    cy.contains('Submit').click()

    cy.contains('Could not find the following card: INVALID_CARD').should(
      'exist'
    )
  })

  // Check competitive
  it('should show competitive', () => {
    cy.contains('Competitive').click()
    cy.contains('Season 1').click()

    cy.contains('Rules').should('exist')
    cy.get('.list-decimal')
      .children()
      .should('have.length', 8)
    cy.get('.markdown').should('have.length', 8)

    cy.contains('Games').should('exist')
    cy.contains('Jan 3rd, 2022').click()
    cy.contains('Kadena, Slinking Sorcerer').should('exist')
    cy.contains('Jan 3rd, 2022').click()
    cy.contains('Kadena, Slinking Sorcerer').should('not.exist')

    cy.contains('Leaderboard').should('exist')
  })

  // Check treachery
  it('should show treachery', () => {
    cy.contains('Treachery').click()
    cy.contains('4-Letter Room Code').should('exist')
    cy.contains('Create Room').click()
    cy.contains('Number of Players').should('exist')

    cy.contains('4').click()
    cy.get('[data-cy="select-options"]')
      .children()
      .should('have.length', '5')
    cy.get('body').click(10, 10)
    cy.contains('4').click()
    cy.contains('5').click()
    cy.contains('5').should('exist')
  })
})
