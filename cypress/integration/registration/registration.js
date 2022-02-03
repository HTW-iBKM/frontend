describe("Login-page", function () {
    before(() => {
        cy.exec("npm start");
        cy.visit("/#");
    });
    it("Registration", function () {
        cy.get('div.mt-6 > .mr-4').click();
        cy.get('#email').type('alainngoufack@protonmail.com');
        cy.get('#firstname').type('alain');
        cy.get('#lastname').type('ngoufack');
        cy.get('#password').type('Hallo123!');
        cy.get('#passwordConfirmed').type('Hallo123!');
        cy.get('.bg-secondary').click();
        cy.get('.text-caption').click();
    });
});