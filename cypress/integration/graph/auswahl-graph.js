describe("Graph", function () {
    before(() => {
        cy.exec("npm start");
        cy.visit("/login");
    });

    describe('Graph Auswahl', function(){
        it("Auswahl der Bilanzkreis A", function () {

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
            cy.get('#headlessui-menu-button-22').eq(0).click();

            //Auswahl des Intervalls in Stunden
            cy.get('#headlessui-menu-item-38').click();

            //Enthält der Dropdown 'Stunde' als Auswahl?
            cy.get('#headlessui-menu-item-38').should('contain', 'Stunde');

            //Auswahl des Zeitraums
            cy.get('#headlessui-menu-button-24').should('contain', 'Tag');
            cy.get('#headlessui-menu-button-24').click();

            //Auswahl des Zeitraums pro Woche
            cy.get('#headlessui-menu-item-52').click();

            //Zeitraum Dropdown besitzt foldenden Parameter
            cy.get('#headlessui-menu-button-24').should('contain.text', 'Woche', 'Monat', 'Jahr', 'Kalender');

            //Mehr Dateien Sehen
            cy.get('.justify-end > .flex > .undefined').click();

            //Das heutige Datum wird dort angezeigt, (das richtige Datum mit 03.02.2022 einsetzen)
            cy.get('.block > :nth-child(1) > :nth-child(3)').should('contain', '03.02.2022');
        });
    });

});