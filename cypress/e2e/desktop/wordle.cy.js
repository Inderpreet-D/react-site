/// <reference types="Cypress" />

import { goto, getTitle } from '../../support/e2e'

// describe('Wordle', () => {
//   beforeEach(() => {
//     cy.viewport('macbook-16')
//   })

//   // Failed guess
//   it('should lose after too many attempts', () => {
//     cy.intercept('/api/words/5', { word: 'fails' })

//     goto('/games/wordle')

//     cy.get('body').click()
//     cy.wait(500)
//     cy.get('body').type('TESTS{enter}')
//     cy.wait(500)
//     cy.get('body').type('JESTS{enter}')
//     cy.wait(500)
//     cy.get('body').type('RESTS{enter}')
//     cy.wait(500)
//     cy.get('body').type('HEARS{enter}')
//     cy.wait(500)
//     cy.get('body').type('FEARS{enter}')
//     cy.wait(500)
//     cy.get('body').type('CARES{enter}')
//     cy.wait(500)

//     cy.contains('Game over: the word was FAILS').should('exist')
//   })

//   // Win testing
//   it('should succeed', () => {
//     cy.intercept('/api/words/5', { word: 'seeds' })

//     goto('/games/wordle')

//     cy.get('body').click()
//     cy.wait(500)
//     cy.get('body').type('TESTS{enter}')
//     cy.wait(500)
//     cy.get('body').type('JESTS{enter}')
//     cy.wait(500)
//     cy.get('body').type('RESTS{enter}')
//     cy.wait(500)
//     cy.get('body').type('H1EARS{enter}')
//     cy.wait(500)
//     cy.get('body').type('{backspace}FEARS{enter}')
//     cy.wait(500)
//     cy.get('body').type('SEER{backspace}DSS{enter}')
//     cy.wait(500)

//     cy.contains('Game over: You won').should('exist')
//   })
// })
