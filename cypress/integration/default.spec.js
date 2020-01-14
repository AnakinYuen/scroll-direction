/// <reference types="Cypress" />

context('Default', function() {
  beforeEach(function() {
    cy.visit('./demo/cypress-environment.html')
      .window()
      .then(win => {
        const scrollDirection = new win.ScrollDirection();
        scrollDirection.start();
      });
  });

  it('should have default value down in attribute', function() {
    cy.get('html').should('have.attr', 'data-scroll-direction', 'down');
  });
});
