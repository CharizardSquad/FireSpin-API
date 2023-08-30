describe('Signup Test', () => {
  it('passes', () => {
    cy.visit('/')

    cy.get('#username').type('username');
    cy.get('#password').type('password');

    // Submit the form
    cy.contains('Submit').click();
    cy.url().should('include', 'home')

    // cy.get('#username').type('username');
    // cy.get('#password').type('password');

    // // Submit the form
    // cy.contains('Submit').click();

  })
})