/// <reference types="cypress" />

describe('test login', () => {
    before(() => {
        cy.visit('/signin')
        cy.get(':nth-child(1) > .form-control').type("jubelltols")
        cy.get(':nth-child(2) > .form-control').type("jubelltols")
        cy.get('.col-12 > .w-100').click()
        cy.get('.dropdown-toggle').contains("jubelltols")
    })

    it('Visitar la pagina sign in', () => {
        cy.visit('/rent')
        cy.get('.btn-outline-light').click()
        cy.get(':nth-child(1) > .card > .card-body > :nth-child(3) > .p-2').click()
        cy.get('.g-3').children().should('have.length', 15)
    })

    after(() => {
        cy.visit('/')
    })
})