describe('Signup Test', () => {
  it('passes', () => {
    cy.visit('/')

    cy.get('#username').type('username');
    cy.get('#password').type('password');

    // Submit the form
    cy.contains('Submit').click();
    // cy.contains('Submit').click();
    // cy.url().should('include', 'signup')

    // cy.get('#username').type('username');
    // cy.get('#password').type('password');

    // // Submit the form
    // cy.contains('Submit').click();

  })
})