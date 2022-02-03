describe("Abmelden", function () {
    before(() => {
        cy.exec("npm start");
        cy.visit("/login");
    });
    it("Abmelden", function () {
        cy.get('#email').type('alainngoufack@protonmail.com');
        cy.get('#password').type('Hallo123!');
        cy.get('.bg-secondary').click();
        cy.get('.my-5').should('contain.text', 'Bitte wählen Sie ihren Bilanzkreis aus, um Inhalte ansehen zu können');
        cy.get('#headlessui-menu-button-2 > .h-6 > svg').click();
        cy.get('#headlessui-menu-items-6 > :nth-child(2) > .flex').click();
        cy.get('.text-h4').should('not.be.empty', 'login');
        cy.get('#email').should('be.empty');
        cy.get('#password').should('be.empty');
    });
});