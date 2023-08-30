describe('Signup Test', () => {
  it('passes', () => {
    cy.visit('/');

    cy.get('#username').type('testing');
    cy.get('#password').type('testing');

    // Submit the form
    cy.contains('Submit').click();
    cy.url().should('include', 'home');

    const pastedText = 'https://dog.ceo/api/breeds/image/random';

    cy.get('.input-API').type(pastedText);
    cy.get('call-freq').type('2');
    cy.contains('Fetch Data').click();
    cy.get('.lineGraph').should('exist');

    cy.contains('History').click();
    cy.get('.modal-content').should('exist');
    cy.get('.modal-content').within(() => {
      cy.contains(pastedText).should('exist');
    });
    });
});

