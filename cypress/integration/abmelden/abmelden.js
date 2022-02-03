describe("Abmelden", function () {
    before(() => {
        cy.exec("npm start");
        cy.visit("/login");
    });
    describe('Abmeldung nach Anmeldung', function (){
        it("Abmelden", function () {

            //Anmeldung mit richtigen Daten
            cy.get('#email').type('alainngoufack@protonmail.com');
            cy.get('#password').type('Hallo123!');

            // Anmelden Button clicken
            cy.get('.bg-secondary').click();

            // Text beim Login Page vergleichen
            cy.get('.my-5').should('contain.text', 'Bitte wählen Sie ihren Bilanzkreis aus, um Inhalte ansehen zu können');

            // Einstellung-Icon auswählen
            cy.get('#headlessui-menu-button-2 > .h-6 > svg').click();

            // Abmelden auswählen
            cy.get('#headlessui-menu-items-6 > :nth-child(2) > .flex').click();

            // Zurück auf der Login-Seite
            cy.get('.text-h4').should('not.be.empty', 'login');

            //Ist E-Mail Feld leer? Ja
            cy.get('#email').should('be.empty');

            // Ist Password-Feld leer? Ja
            cy.get('#password').should('be.empty');
        });
    });
});