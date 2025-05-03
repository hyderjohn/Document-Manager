// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from failing the test
  return false
})

// Global before hook
beforeEach(() => {
  // Clear localStorage before each test
  cy.clearLocalStorage()
  
  // Clear cookies before each test
  cy.clearCookies()
})

// Global after hook
afterEach(() => {
  // Add any cleanup tasks here
}) 