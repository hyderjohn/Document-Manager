/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    attachFile(fileName: string): Chainable<Element>;
  }
}
