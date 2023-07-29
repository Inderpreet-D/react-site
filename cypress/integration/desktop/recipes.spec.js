/// <reference types="Cypress" />

import { goto } from '../../support'

describe('Recipes', () => {
  beforeEach(() => {
    cy.viewport('macbook-16')
    goto('/recipes')
  })

  // Check multiple recipes
  it('should switch between recipes', () => {
    cy.contains('Brown Butter Cookies').click()
    cy.contains('button', 'Ingredients').should('exist')
    cy.contains('button', 'Recipe').should('exist')

    cy.contains('Pizza Dough').click()
    cy.contains('Makes: 2 personal size pizzas').should('exist')
  })

  // Check ingredients
  it('should check off ingredients', () => {
    cy.contains('Brown Butter Cookies').click()

    const ingredient = cy.contains('2 - Large eggs')
    ingredient.should('not.have.class', 'line-through')
    ingredient.click()
    ingredient.should('have.class', 'line-through')

    cy.contains('284g - Salted butter, browned')
      .parent()
      .children()
      .first()
      .children()
      .should('have.length', 0)

    cy.contains('284g - Salted butter, browned')
      .parent()
      .children()
      .first()
      .click()

    cy.contains('284g - Salted butter, browned')
      .parent()
      .children()
      .first()
      .children()
      .should('have.length', 1)
  })

  // Show recipe
  it('should show recipe', () => {
    cy.contains('Brown Butter Cookies').click()
    cy.contains('button', 'Recipe').click()
    cy.contains('1 / 4').should('exist')
  })
})
