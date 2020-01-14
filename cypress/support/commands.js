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
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add(
  'smoothScrollY',
  { prevSubject: 'optional' },
  (subject, from, to, duration = 1000, pixelPerScrollEvent = 5) => {
    let target;
    if (subject && Cypress.dom.isElement(subject)) {
      target = Cypress.dom.unwrap(subject)[0];
    }

    cy.window().then(win => win.smoothScrollY(from, to, duration, pixelPerScrollEvent, target));
  },
);
