describe("Login-page", function () {
    before(() => {
        cy.exec("npm start");
        cy.visit("/login");
    });
    it("Login", function () {
        cy.get('#email').type('alainngoufack@protonmail.com');
        cy.get('#password').type('Hallo123!');
        cy.get('.bg-secondary').click();
        cy.get('.my-5').should('contain.text', 'Bitte wählen Sie ihren Bilanzkreis aus, um Inhalte ansehen zu können');
    });
});