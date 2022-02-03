describe("Login-page", function () {
    before(() => {
        cy.exec("npm start");
        cy.visit("/#");
    });
    describe('Neue Konto erstellen', function (){
        it("Registration", function () {
            // Button JETZT LOSLEGEN clicken
            cy.get('div.mt-6 > .mr-4').click();

            //E-Mail-Adresse eingeben
            cy.get('#email').type('alainngoufack@protonmail.com');

            // Vorname eingeben
            cy.get('#firstname').type('alain');

            // Nachname eingeben
            cy.get('#lastname').type('ngoufack');

            // Password eingeben
            cy.get('#password').type('Hallo123!');

            // Password wiederholen
            cy.get('#passwordConfirmed').type('Hallo123!');

            //Button Anmelden clicken
            cy.get('.bg-secondary').click();

            // Login
            cy.get('.text-caption').click();
        });
    })
});