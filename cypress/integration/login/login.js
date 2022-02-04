describe("Login-page", function () {
    before(() => {
        cy.exec("npm start");
        cy.visit("/login");
    });
    describe('Login-Seite', function (){
        it("Login", function () {

            // Normaler Login
            cy.get('#email').type('alainngoufack@protonmail.com');
            cy.get('#password').type('Hallo123!');

            //Anmelden Button clicken
            cy.get('.bg-secondary').click();
            //Angezeigte Text bei Login-Seite vergleichen
            cy.get('.my-5').should('contain.text', 'Bitte wählen Sie ihren Bilanzkreis aus, um Inhalte ansehen zu können');
        });
    });
});