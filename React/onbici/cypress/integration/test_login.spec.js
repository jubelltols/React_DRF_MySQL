/// <reference types="cypress" />

describe('test login', () => {
    it('Visitar la pagina sign in', () => {
        cy.visit('http://localhost:3000/signin')
    })

    it('Buscar el input de username y introducir el username', () => {
        cy.get(':nth-child(1) > .form-control').type("jubelltols")
    })

    it('Buscar el input de password y introducir el password', () => {
        cy.get(':nth-child(2) > .form-control').type("jubelltols")
    })

    it('Buscar el boton de signin y hacer click', () => {
        cy.get('.w-100').click()
    })

    it('Buscar el usuario y comprobar el username', () => {
        cy.get('.dropdown-toggle').contains("jubelltols")
    })
})

