describe("Dashboard", function () {
    before(() => {
        cy.exec("npm start");
        cy.visit("/login");
    });
    describe('Datei Löschen', function (){
        it("Datei löschen", function () {

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

            //Datei löschen --> Abbrechen
            cy.get(':nth-child(1) > .flex > :nth-child(3) > .w-4 > path').click();
            cy.wait(4000);

            //Abbrechen
            cy.get('.border-secondary').should('contain', 'Abbrechen');
            cy.get('.border-secondary').click();

            //11 Dateien verfügbar
            cy.get('.ml-8').should('contain', '11');

            cy.wait(2000);
            //Datei löschen
            cy.get(':nth-child(1) > .flex > :nth-child(3) > .w-4 > path').click();
            cy.wait(3000);

            //Datei erfolgreich löschen
            cy.get('.bg-danger').should('contain', 'Löschen')
            cy.get('.bg-danger').click();
            // Eine Datei wurde gelöscht und fehlt nur 10 Dateien verfügbar
            cy.get('.ml-8').should('contain', '10');
        });
    });
});