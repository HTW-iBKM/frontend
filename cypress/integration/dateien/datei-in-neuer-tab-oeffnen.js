describe("Dashboard", function () {
    before(() => {
        cy.exec("npm start");
        cy.visit("/login");
    });
    describe('Datei in neuem Fernster öffnen', function (){
        it("Datei in neuer Tab öffnen", function () {

            // Normaler Login
            cy.get('#email').type('alainngoufack@protonmail.com');
            cy.get('#password').type('Hallo123!');

            //Anmelden Button clicken
            cy.get('.bg-secondary').click();
            cy.get('.my-5').should('contain.text', 'Bitte wählen Sie ihren Bilanzkreis aus, um Inhalte ansehen zu können');

            cy.wait(2000);
            cy.get('.undefined').click();

            //Auswahl von Bilanzkreis der Typs "A"
            cy.get('[id="Bilanzkreis A"]').click();

            //Auswahl speichern
            cy.get('.mt-8 > .bg-secondary').click();

            //Datei in neuer Tab öffnen
            cy.get(':nth-child(2) > .flex > :nth-child(1) > .w-4').click();
        });
    });
});