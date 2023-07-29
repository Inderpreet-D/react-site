/// <reference types="Cypress" />

import { goto, getTitle } from '../../support'

describe('Life', () => {
  beforeEach(() => {
    cy.viewport('macbook-16')
    goto('/games/gol')
  })

  // Check that controls work
  it('should adjust controls', () => {
    cy.contains('Width').click()
    cy.focused()
      .type('{backspace}')
      .should('have.value', '16')

    cy.tab()
    cy.focused()
      .type('4')
      .should('have.value', '4')

    cy.tab()
    cy.focused()
      .type('{downArrow}')
      .should('have.value', '9')
      .type('{upArrow}')
      .should('have.value', '10')

    cy.contains('Reset').click()

    cy.get('canvas').click(100, 100, { force: true })
    cy.get('canvas').click(110, 100, { force: true })
    cy.get('canvas').click(120, 100, { force: true })

    cy.contains('Step')
      .click()
      .click()
      .click()

    cy.contains('Start')
      .click()
      .should('have.text', 'Stop')
      .wait(500)
      .click()
      .should('have.text', 'Start')

    cy.contains('Start').click()

    cy.contains('Step').click()

    cy.contains('Stop').click()

    cy.contains('Start').click()

    cy.contains('Delay').click()
    cy.focused()
      .type('11')
      .should('have.value', '11')

    cy.contains('Start').click()

    cy.get('canvas').click(130, 100, { force: true })

    cy.contains('Start').click()

    cy.contains('Reset').click()
  })
})
