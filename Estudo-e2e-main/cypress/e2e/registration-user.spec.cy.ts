describe('Caso de teste 1: Registro de usuario', () => {
  it('Deve apresentar erro ao não preencher campos obrigatorios do registro de usuario', () => {
    cy.registerUserWithIncompleteForm()
  });
  it('Deve apresentar erro ao preencher um email invalido', () => {
    cy.registerUserWithInvalidEmail()
  });
  it('Deve registrar um usuario valido', () => {
    cy.registerValidUser()
  });
  it('Deve apresentar erro ao preencher email já cadastrado', () => {
    cy.registerUserWithExistingEmail()
  });
})