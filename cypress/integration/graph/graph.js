describe("Graph", function () {
    before(() => {
        cy.exec("npm start");
        cy.visit("/login");
    });

    describe('Graph Auswahl', function(){
        it("Auswahl der Graph-Anzeige", function () {

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
        });
        it('Graph-Anzeige 2', function () {
            cy.get('div.mt-6 > .mr-4').click();

            cy.get('.text-caption').click();
            cy.get('#email').type('alainngoufack@protonmail.com');
            cy.get('#password').type('Hallo123!');
            cy.get('.bg-secondary').click();
            //Auswahl 2
            cy.get('#headlessui-tabs-tab-38 > .h-5').click()
            cy.wait(2000);
        });

        it('Graph-Anzeige 3', function () {
            cy.get('#headlessui-tabs-tab-40 > .h-5').click();
            cy.wait(1000);
            cy.get('div.mt-6 > .mr-4').click();

            cy.get('.text-caption').click();
            cy.get('#email').type('alainngoufack@protonmail.com');
            cy.get('#password').type('Hallo123!');
            cy.get('.bg-secondary').click();
            cy.wait(1000);
            cy.get('#headlessui-tabs-tab-60').click();
        });
    });

});