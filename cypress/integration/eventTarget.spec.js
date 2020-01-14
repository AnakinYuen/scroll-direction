/// <reference types="Cypress" />

context('EventTarget', function() {
  beforeEach(function() {
    cy.visit('./demo/cypress-environment.html')
      .window()
      .then(win => {
        const eventTarget = new EventTarget();
        cy.wrap(eventTarget).as('eventTarget');
        cy.wrap(cy.stub()).as('scrollUpListener');
        cy.wrap(cy.stub()).as('scrollDownListener');

        const scrollDirection = new win.ScrollDirection({ eventTarget });
        scrollDirection.start();
      });
  });

  it('should dispatch event if eventTarget provided', function() {
    this.eventTarget.addEventListener('up', this.scrollUpListener);
    this.eventTarget.addEventListener('down', this.scrollDownListener);

    cy.scrollTo(0, 300)
      .smoothScrollY(300, 0)
      .wait(100)
      .then(() => {
        expect(this.scrollUpListener).to.be.calledOnce;
      });

    cy.scrollTo(300, 0)
      .smoothScrollY(0, 300)
      .wait(100)
      .then(() => {
        expect(this.scrollDownListener).to.be.calledOnce;
      });
  });

  it('should compatible with rxjs (through fromEvent)', function() {
    cy.window().then(function(win) {
      const $up = win.rxjs.fromEvent(this.eventTarget, 'up');
      const $down = win.rxjs.fromEvent(this.eventTarget, 'down');
      $up.subscribe(this.scrollUpListener);
      $down.subscribe(this.scrollDownListener);

      cy.scrollTo(0, 300)
        .smoothScrollY(300, 0)
        .wait(100)
        .then(() => {
          expect(this.scrollUpListener).to.be.calledOnce;
        });

      cy.scrollTo(300, 0)
        .smoothScrollY(0, 300)
        .wait(100)
        .then(() => {
          expect(this.scrollDownListener).to.be.calledOnce;
        });
    });
  });
});
