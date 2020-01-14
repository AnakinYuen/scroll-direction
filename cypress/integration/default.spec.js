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

  it('should keep the default value when going down', function() {
    cy.smoothScrollY(0, 300)
      .wait(100)
      .get('html')
      .should('have.attr', 'data-scroll-direction', 'down');
  });

  it('should change value to "up" when scroll to up', function() {
    cy.smoothScrollY(300, 0)
      .wait(100)
      .get('html')
      .should('have.attr', 'data-scroll-direction', 'up');
  });

  it('should keep the "up" value when going up', function() {
    cy.smoothScrollY(600, 300)
      .wait(1000)
      .smoothScrollY(300, 0)
      .wait(100)
      .get('html')
      .should('have.attr', 'data-scroll-direction', 'up');
  });
});
