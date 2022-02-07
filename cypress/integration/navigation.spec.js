/// <reference types="Cypress" />

const getTitle = () => cy.get('[data-cy=title]')

describe('Navigation', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  // Home page
  it('should show Home', () => {
    cy.visit('/')

    cy.title().should('equal', 'Home')

    getTitle().should('have.text', 'Inderpreet Dhillon')
  })

  // Projects
  it('should show Projects', () => {
    cy.visit('/projects')

    cy.title().should('equal', 'Projects')
  })

  // MTG hub
  it('should show MTG', () => {
    cy.visit('/mtg')

    cy.title().should('equal', 'MTG Hub')

    getTitle().should('have.text', 'MTG Hub')
  })

  // MTG Toad village
  it('should show MTG toad village', () => {
    cy.visit('/mtg/toadvillage')

    cy.title().should('equal', 'Toad Village')

    getTitle().should('have.text', 'Toad Village')

    // Redirect test
    cy.visit('/mtg/toadvillage')

    cy.title().should('equal', 'Toad Village')

    getTitle().should('have.text', 'Toad Village')
  })

  // MTG Competitive
  it('should show MTG competitive', () => {
    cy.visit('/mtg/competitive')

    cy.title().should('equal', 'Competitive')

    getTitle().should('have.text', 'Competitive')
  })

  // MTG Treachery
  it('should show MTG Treachery', () => {
    cy.visit('/mtg/treachery')

    cy.title().should('equal', 'Treachery')

    getTitle().should('have.text', 'MTG Treachery')
  })

  // Poetry
  it('should show Poetry', () => {
    cy.intercept('GET', '/api/reddit', { fixture: 'redditPoem.json' })

    cy.visit('/poetry')

    cy.title().should('equal', 'Poetry')

    cy.get('[data-cy=title]').should('have.text', 'Poem Title')
  })

  // Recipes
  it('should show Recipes', () => {
    cy.visit('/recipes')

    cy.title().should('equal', 'Recipes')

    getTitle().should('have.text', 'Recipes')
  })

  // Movies
  it('should show Movies', () => {
    cy.visit('/movies')

    cy.title().should('equal', 'Movies')

    getTitle().should('have.text', 'Movie Picker')
  })

  // Secret
  it('should show Secret', () => {
    cy.visit('/secret')
  })

  // 404
  it('should show 404', () => {
    cy.visit('/adwas', { failOnStatusCode: false })

    cy.title().should('equal', '404 - Page Not Found')

    cy.get('h1').should('have.text', 'Page Not Found')

    cy.get('a[href="/"]').should('have.text', 'Go back home')
  })
})
