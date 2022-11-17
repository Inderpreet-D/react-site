/// <reference types="Cypress" />

import { goto, getTitle } from '../../support'

describe('Navigation', () => {
  beforeEach(() => {
    cy.viewport('macbook-16')
  })

  // Home page
  it('should show Home', () => {
    goto('/')

    cy.title().should('equal', 'Home')

    getTitle('Inderpreet Dhillon')
  })

  // Projects
  it('should show Projects', () => {
    goto('/projects')

    cy.title().should('equal', 'Projects')
  })

  // MTG hub
  it('should show MTG', () => {
    goto('/mtg')

    cy.title().should('equal', 'MTG Hub')

    getTitle('MTG Hub')
  })

  // MTG Toad village
  it('should show MTG toad village', () => {
    goto('/mtg/toadvillage')

    cy.title().should('equal', 'Toad Village')

    getTitle('Toad Village')

    // Redirect test
    goto('/mtg/toadvillage')

    cy.title().should('equal', 'Toad Village')

    getTitle('Toad Village')
  })

  // MTG Competitive
  it('should show MTG competitive', () => {
    goto('/mtg/competitive')

    cy.title().should('equal', 'Competitive')

    getTitle('Competitive')
  })

  // MTG Treachery
  it('should show MTG Treachery', () => {
    goto('/mtg/treachery')

    cy.title().should('equal', 'Treachery')

    getTitle('MTG Treachery')
  })

  // Poetry
  it('should show Poetry', () => {
    cy.intercept('GET', '/api/reddit', { fixture: 'redditPoem.json' })

    goto('/poetry')

    cy.title().should('equal', 'Poetry')

    cy.get('[data-cy=title]').should('have.text', 'Poem Title')
  })

  // Recipes
  it('should show Recipes', () => {
    goto('/recipes')

    cy.title().should('equal', 'Recipes')

    getTitle('Recipes')
  })

  // Movies
  it('should show Movies', () => {
    goto('/movies')

    cy.title().should('equal', 'Movies')

    getTitle('Movie Picker')
  })

  // Secret
  it('should show Secret', () => {
    goto('/secret')
  })

  // 404
  it('should show 404', () => {
    goto('/adwas', { failOnStatusCode: false })

    cy.title().should('equal', '404 - Page Not Found')

    cy.get('h1').should('have.text', 'Page Not Found')

    cy.get('a[href="/"]').should('have.text', 'Go back home')
  })

  // Login
  it('should show login', () => {
    goto('/account')

    cy.title().should('equal', 'Login')

    cy.get('[data-cy=title]').should('not.exist')
  })
})
