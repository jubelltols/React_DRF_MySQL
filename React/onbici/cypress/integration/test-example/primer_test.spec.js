/// <reference types="cypress" />

describe('primer test', () => { 
    it('visitar página principal y compruebe que exista algún h1', () => {
        cy.visit('http://localhost:3000/')
        cy.get('h1')
    })
})

