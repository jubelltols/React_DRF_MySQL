// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (username, password) => {
    // Make a POST request to our backend
    // We are using GraphQL, so as a body we are passing mutation:
    cy
    .request({
        url: 'http://127.0.0.1:8000/api/login/',
        method: 'POST',
        body: {
            username, 
            password 
        },
    })
    .then(res => {
        console.log("res:", res)
        // all our private routes check for auth token stored in redux store, so let's pass it there
        window.localStorage.setItem("token", res.body.access)
        // go to Dashboard
    });
});