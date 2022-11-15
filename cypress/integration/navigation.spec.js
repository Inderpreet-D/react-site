/// <reference types="Cypress" />

import { waitForVerify, getTitle } from '../support'

describe('Navigation', () => {
  beforeEach(() => {
    cy.viewport('macbook-16')
  })

  // Home page
  it('should show Home', () => {
    cy.visit('/')
    waitForVerify()

    cy.title().should('equal', 'Home')

    getTitle('Inderpreet Dhillon')
  })

  // Projects
  it('should show Projects', () => {
    cy.visit('/projects')
    waitForVerify()

    cy.title().should('equal', 'Projects')
  })

  // MTG hub
  it('should show MTG', () => {
    cy.visit('/mtg')
    waitForVerify()

    cy.title().should('equal', 'MTG Hub')

    getTitle('MTG Hub')
  })

  // MTG Toad village
  it('should show MTG toad village', () => {
    cy.visit('/mtg/toadvillage')
    waitForVerify()

    cy.title().should('equal', 'Toad Village')

    getTitle('Toad Village')

    // Redirect test
    cy.visit('/mtg/toadvillage')

    cy.title().should('equal', 'Toad Village')

    getTitle('Toad Village')
  })

  // MTG Competitive
  it('should show MTG competitive', () => {
    cy.visit('/mtg/competitive')
    waitForVerify()

    cy.title().should('equal', 'Competitive')

    getTitle('Competitive')
  })

  // MTG Treachery
  it('should show MTG Treachery', () => {
    cy.visit('/mtg/treachery')
    waitForVerify()

    cy.title().should('equal', 'Treachery')

    getTitle('MTG Treachery')
  })

  // Poetry
  it('should show Poetry', () => {
    cy.intercept('GET', '/api/reddit', { fixture: 'redditPoem.json' })

    cy.visit('/poetry')
    waitForVerify()

    cy.title().should('equal', 'Poetry')

    cy.get('[data-cy=title]').should('have.text', 'Poem Title')
  })

  // Recipes
  it('should show Recipes', () => {
    cy.visit('/recipes')
    waitForVerify()

    cy.title().should('equal', 'Recipes')

    getTitle('Recipes')
  })

  // Movies
  it('should show Movies', () => {
    cy.visit('/movies')
    waitForVerify()

    cy.title().should('equal', 'Movies')

    getTitle('Movie Picker')
  })

  // Secret
  it('should show Secret', () => {
    cy.visit('/secret')
    waitForVerify()
  })

  // 404
  it('should show 404', () => {
    cy.visit('/adwas', { failOnStatusCode: false })
    waitForVerify()

    cy.title().should('equal', '404 - Page Not Found')

    cy.get('h1').should('have.text', 'Page Not Found')

    cy.get('a[href="/"]').should('have.text', 'Go back home')
  })

  // Login
  it('should show login', () => {
    cy.visit('/account')
    waitForVerify()

    cy.title().should('equal', 'Login')

    cy.get('[data-cy=title]').should('not.exist')
  })
})
