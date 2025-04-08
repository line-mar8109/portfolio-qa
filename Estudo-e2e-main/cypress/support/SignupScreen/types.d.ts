// load type definitions from Cypress module
/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable {
        /**
         * Comando customizado para checar e selecionar termo de uso
         * @example cy.registerValidUser()
         */
        registerValidUser(): Chainable<Element>;
        /**
         * Comando customizado para checar e selecionar termo de uso
         * @example cy.registerUserWithInvalidEmail()
         */
        registerUserWithInvalidEmail(): Chainable<Element>;
        /**
         * Comando customizado para checar e selecionar termo de uso
         * @example cy.registreUserInvalid()
         */
        registerUserWithIncompleteForm(): Chainable<Element>;
         /**
         * Comando customizado para checar e selecionar termo de uso
         * @example cy.registreFirstEmailExist()
         */
         registerUserWithExistingEmail(): Chainable<Element>;
    }
}