const userMockData = require('../../fixtures/faker.js');

const navigateToLoginPage = () => {
    cy.visit('/');
    cy.get('#header .shop-menu').find('ul').children().then(($listItems) => {
        cy.wrap($listItems).eq(3).find('a').should('have.attr', 'href', '/login').click();
    });
    cy.url().should('eq', Cypress.config().baseUrl + '/login');
    cy.get('#form .row').children().should('have.length', 3);
};

const fillSignupForm = (firstName: string, email: string) => {
    cy.get('[data-qa="signup-name"]')
        .type(firstName)
        .should('have.value', firstName);
    cy.get('[data-qa="signup-email"]')
        .type(email)
        .should('have.value', email);
    cy.get('[data-qa="signup-button"]').should('be.enabled').click();
};

const fillAccountInformation = () => {
    cy.get('.login-form')
        .contains('Enter Account Information', { matchCase: false })
        .should('be.visible');
    cy.get('#id_gender2').check().should('be.checked');
    cy.get('[data-qa="name"]')
        .invoke('val')
        .should('eq', userMockData.firstname);
    cy.get('[data-qa="email"]')
        .invoke('val')
        .should('eq', userMockData.email);
    cy.get('[data-qa="password"]')
        .type(userMockData.password)
        .should('have.value', userMockData.password);
};

const fillUserAddress = () => {
    cy.get('h2.title.text-center')
        .contains('Address Information', { matchCase: false })
        .should('be.visible');
    cy.get('[data-qa="first_name"]')
        .type(userMockData.firstname)
        .should('have.value', userMockData.firstname);
    cy.get('[data-qa="last_name"]')
        .type(userMockData.lastname)
        .should('have.value', userMockData.lastname);
    cy.get('[data-qa="address"]')
        .type(userMockData.address)
        .should('have.value', userMockData.address);
    cy.get('[data-qa="country"]')
        .select(userMockData.country)
        .find('option:selected')
        .invoke('text')
        .should('be.oneOf', ['India', 'United States', 'Canada', 'Australia', 'Israel', 'New Zealand', 'Singapore']);
    cy.get('[data-qa="state"]')
        .type(userMockData.state)
        .should('have.value', userMockData.state);
    cy.get('[data-qa="city"]')
        .type(userMockData.city)
        .should('have.value', userMockData.city);
    cy.get('[data-qa="zipcode"]')
        .type(userMockData.zipcode)
        .should('have.value', userMockData.zipcode);
    cy.get('[data-qa="mobile_number"]')
        .type(userMockData.mobile)
        .should('have.value', userMockData.mobile);
};

const fillDateOfBirth = () => {
    cy.get('[data-qa="days"]')
        .select(userMockData.day30)
        .should('have.value', userMockData.day30);
    cy.get('[data-qa="months"]')
        .select(userMockData.month)
        .find('option:selected')
        .should('have.text', userMockData.month);
    cy.get('[data-qa="years"]', { timeout: 10000 })
        .select(userMockData.year)
        .should('have.value', userMockData.year);
};

const subscribeToNewsletterAndOffers = () => {
    cy.get('#newsletter').check().should('be.checked');
    cy.get('#optin').check().should('be.checked');
};

const submitRegistrationForm = () => {
    cy.get('[data-qa="create-account"]').should('be.enabled').click();
};

const verifyAccountCreation = () => {
    cy.url().should('include', '/account_created');
    cy.get('[data-qa="account-created"]').should('have.text', 'Account Created!');
    cy.get('[data-qa="continue-button"]').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/');
};

const validateInvalidEmailError = () => {
    cy.get('input[name="email"]').then(($input) => {
        const validationMessage = ($input[1] as HTMLInputElement).validationMessage;
        cy.wrap(validationMessage).then((message) => {
            expect(message.trim()).to.eq('Inclua um "@" no endereço de e-mail. "invalidEmail" está com um "@" faltando.');
        });
    });
    cy.url({ timeout: 10000 })
        .should('include', '/login')
        .title()
        .should('eq', 'Automation Exercise - Signup / Login');
};

const validateIncompleteFormError = () => {
    cy.get('input[name="first_name"]').then(($input) => {
        const validationMessage = ($input[0] as HTMLInputElement).validationMessage;
        cy.log(validationMessage);
        cy.wrap(validationMessage).then((message) => {
            expect(message).to.eq('Preencha este campo.');
        });
    });
    cy.url({ timeout: 10000 }).should('include', '/signup');
};

Cypress.Commands.add('registerValidUser', () => {
    navigateToLoginPage();
    fillSignupForm(userMockData.firstname, userMockData.email);
    fillAccountInformation();
    fillDateOfBirth();
    subscribeToNewsletterAndOffers();
    fillUserAddress();
    submitRegistrationForm();
    verifyAccountCreation();
});

Cypress.Commands.add('registerUserWithInvalidEmail', () => {
    navigateToLoginPage();
    fillSignupForm(userMockData.firstname, 'invalidEmail');
    validateInvalidEmailError();
});

Cypress.Commands.add('registerUserWithIncompleteForm', () => {
    navigateToLoginPage();
    fillSignupForm(userMockData.firstname, userMockData.email);
    fillAccountInformation();
    submitRegistrationForm();
    validateIncompleteFormError();
});

Cypress.Commands.add('registerUserWithExistingEmail', () => {
    navigateToLoginPage();
    fillSignupForm(userMockData.firstname, userMockData.email);
    cy.get('.signup-form > form > p').invoke('text').should('eq', 'Email Address already exist!');
    cy.url({ timeout: 10000 }).should('include', '/signup');
});