describe("Graph", function () {
    before(() => {
        cy.exec("npm start");
        cy.visit("/login");
    });

    describe('Graph speichern', function () {
        it("Graph als Datei speichern", function () {

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

            cy.get('.mx-5 > :nth-child(2) > svg > path').click();

            //Name der Datei eingeben
            cy.get('#file-name').type('Meine Datei');

            //Graph als PNG speichern und Herunterladen
            cy.get('#headlessui-radiogroup-option-48 > .w-5').click();
            cy.wait(1000);

            cy.get('.mt-8 > .bg-secondary').click();
        });
    });
});