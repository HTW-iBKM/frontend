describe("Graph", function () {
    before(() => {
        cy.exec("npm start");
        cy.visit("/login");
    });
    it("Auswahl der Bilanzkreis", function () {
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
        cy.get('#headlessui-menu-item-38').should('contain', 'Stunde');

        //Auswahl des Zeitraums
        cy.get('#headlessui-menu-button-24').should('contain', 'Tag');
        cy.get('#headlessui-menu-button-24').click();
        //Auswahl des Zeitraums pro Woche
        cy.get('#headlessui-menu-item-52').click();
        cy.get('#headlessui-menu-button-24').should('contain.text', 'Woche', 'Monat', 'Jahr', 'Kalender');

        //Mehr Dateien Sehen
        cy.get('.justify-end > .flex > .undefined').click();
        //const todaysDate = Cypress.moment().format('DD.MM.YYYY');
        //cy.get('.block > :nth-child(1) > :nth-child(3)').should('contain', todaysDate);
        cy.get('.block > :nth-child(1) > :nth-child(3)').should('contain', '03.02.2022');
    });
});