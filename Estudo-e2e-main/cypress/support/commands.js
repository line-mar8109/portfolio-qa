Cypress.on('uncaught:exception', () => {
  // retornar false para que o cypress ignore erro de permissão
  return false;
});
import './SignupScreen'