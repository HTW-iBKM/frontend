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

            cy.get('.text-grayscale-dark').click();

            //Nächste Datei-Seite
            cy.get(':nth-child(5) > .h-4').click();
            cy.wait(2000);

            //Zurück auf der erste Datei-Seite
            cy.get(':nth-child(4) > .h-4').click();

            cy.get('[placeholder="Suche..."]').type('Graph');
            cy.get('.text-h5').should('contain', 'Dateien');
        });
    });
});