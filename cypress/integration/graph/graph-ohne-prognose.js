describe("Graph", function () {
    before(() => {
        cy.exec("npm start");
        cy.visit("/login");
    });

    describe('Graph Anzeige', function () {
        it("Graph ohne Prognose anzeigen", function () {

            // Muss man sich zuerst einloggen
            cy.get('#email').type('alainngoufack@protonmail.com');
            cy.get('#password').type('Hallo123!');
            cy.get('.bg-secondary').click();
            cy.get('.my-5').should('contain.text', 'Bitte wählen Sie ihren Bilanzkreis aus, um Inhalte ansehen zu können');
            cy.get('.undefined').click();

            //Auswahl von Bilanzkreis der Typs "A"
            cy.get('[id="Bilanzkreis A"]').click();

            //Auswahl speichern
            cy.get('.mt-8 > .bg-secondary').click();

            cy.get('.mx-5 > :nth-child(1) > svg > path').click();
            cy.get('fieldset > .flex-col > :nth-child(1)').click();
            cy.wait(2000);

            cy.get('.mt-8 > .bg-secondary').click();
        });
    });
});