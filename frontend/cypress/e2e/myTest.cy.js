/// <reference types="cypress" />

context('Big brain', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  })

  it('happy path passes', () => {
    cy.get('a[aria-label="Register button"]')
      .click()
  })
})