/// <reference types="Cypress" />

context('Element', function() {
  beforeEach(function() {
    cy.visit('./demo/cypress-environment.html')
      .window()
      .then(win => win.ScrollDirection)
      .as('ScrollDirection');
  });

  it('should monitor specific element scroll only', function() {
    cy.get('#container')
      .then($container => {
        const scrollDirection = new this.ScrollDirection({
          element: $container[0],
        });
        scrollDirection.start();
      })
      .smoothScrollY(0, 300)
      .wait(100)
      .get('#container')
      .smoothScrollY(300, 0)
      .get('html')
      .should('have.attr', 'data-scroll-direction', 'up')
      .smoothScrollY(0, 300)
      .get('html')
      .should('have.attr', 'data-scroll-direction', 'up')
      .should('not.have.attr', 'data-scroll-direction', 'down');
  });
});
