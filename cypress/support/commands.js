import 'cypress-file-upload';

Cypress.Commands.add('login', (email, password) => {
  cy.visit('/login')
  cy.get('input[name="email"]').type(email)
  cy.get('input[name="password"]').type(password)
  cy.get('button[type="submit"]').click()
})

Cypress.Commands.add('logout', () => {
  cy.get('button').contains('Logout').click()
  cy.url().should('include', '/login')
})

Cypress.Commands.add('uploadDocument', (fileName) => {
  cy.get('input[type="file"]').attachFile(fileName)
})

Cypress.Commands.add('deleteDocument', (documentName) => {
  cy.get('table tbody tr').contains(documentName).parent().find('button').contains('Delete').click()
  cy.get('.modal').should('be.visible')
  cy.get('button').contains('Confirm').click()
})

Cypress.Commands.add('askQuestion', (documentId, question) => {
  cy.get('select[name="document"]').select(documentId)
  cy.get('textarea[name="question"]').type(question)
  cy.get('button[type="submit"]').click()
}) 