/// <reference types="Cypress" />

context('Options', function() {
  beforeEach(function() {
    cy.visit('./demo/cypress-environment.html')
      .window()
      .then(win => win.ScrollDirection)
      .as('ScrollDirection');
  });

  it('should set the attribute', function() {
    const scrollDirection = new this.ScrollDirection({
      attribute: 'data-cypress-scroll-direction',
    });
    scrollDirection.start();

    cy.get('html').should('have.attr', 'data-cypress-scroll-direction');
  });

  it('should set the default direction', function() {
    const scrollDirection = new this.ScrollDirection({
      direction: 'up',
    });
    scrollDirection.start();

    cy.get('html').should('have.attr', 'data-scroll-direction', 'up');
  });

  it('should add the attribute to specific element', function() {
    cy.get('body')
      .then($body => {
        const scrollDirection = new this.ScrollDirection({
          addAttributeTo: $body[0],
        });
        scrollDirection.start();
      })
      .should('have.attr', 'data-scroll-direction');
  });

  it('should become insensitive when the threshold pixels value is large', function() {
    const scrollDirection = new this.ScrollDirection({
      thresholdPixels: 500,
    });
    scrollDirection.start();

    cy.scrollTo(0, 300)
      .wait(100)
      .smoothScrollY(300, 0)
      .wait(100)
      .get('html')
      .should('not.have.attr', 'data-scroll-direction', 'up')
      .should('have.attr', 'data-scroll-direction', 'down');
  });

  it('should become sensitive when the threshold pixels value is small', function() {
    const scrollDirection = new this.ScrollDirection({
      thresholdPixels: 10,
    });
    scrollDirection.start();

    cy.scrollTo(0, 300)
      .wait(100)
      .smoothScrollY(300, 280, 20, 1)
      .wait(100)
      .get('html')
      .should('have.attr', 'data-scroll-direction', 'up')
      .should('not.have.attr', 'data-scroll-direction', 'down');
  });

  it('should become insensitive when the history max age is short', function() {
    const scrollDirection = new this.ScrollDirection({
      historyMaxAge: 10,
    });
    scrollDirection.start();

    cy.scrollTo(0, 300)
      .wait(100)
      .smoothScrollY(300, 0)
      .wait(100)
      .get('html')
      .should('not.have.attr', 'data-scroll-direction', 'up')
      .should('have.attr', 'data-scroll-direction', 'down');
  });

  it('should become insensitive when the history length is short', function() {
    const scrollDirection = new this.ScrollDirection({
      historyLength: 1,
    });
    scrollDirection.start();

    cy.scrollTo(0, 300)
      .wait(100)
      .smoothScrollY(300, 0, 3000, 1)
      .wait(100)
      .get('html')
      .should('not.have.attr', 'data-scroll-direction', 'up')
      .should('have.attr', 'data-scroll-direction', 'down');
  });
});
