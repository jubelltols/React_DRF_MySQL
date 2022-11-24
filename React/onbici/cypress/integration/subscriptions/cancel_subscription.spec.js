/// <reference types="cypress" />

describe('Test cancelacion al final del periodo actual', () => { 

    beforeEach(() => {
        cy.login('teststripe', 'teststripe');
    });

    it('Visitamos la pagina principal y abrimos el dropdown, click en el profile', () => {
        cy.visit('/')
        cy.get('#dropdown-basic').click()
        cy.get(':nth-child(1) > .dropdown-item').click()
    })

    it('Buscamos la seccion de suscripciones y hacemos click', () => {
        cy.get('#left-tabs-example-tab-subscription').click()
    })

    it('Buscamos el boton de cancelacion al final del periodo actual y hacemos click', () => {
        cy.get('.container > :nth-child(2) > :nth-child(1) > .col-12').click()
    })

    it('Comprobamos que la accion se ha realizado correctamente, buscado el valor si, el boton de reactivar suscripcion, toast de success', () => {
        cy.get('.list-group > :nth-child(3)').contains("Si")
        cy.get('.container > :nth-child(2) > :nth-child(1) > .col-12')
        cy.get('.fade > .text-light')
    })
})
