Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})

describe('Example', function() {
    it('Showcase', function() {
        cy.visit('localhost:4200/')
        cy.contains('Sign in with email').click()
        cy.get('#ui-sign-in-email-input').type("test@gmail.com")
        cy.contains('Next').click()
        cy.get('#ui-sign-in-password-input').type("password123")
        cy.get('.firebaseui-id-submit').click()
        cy.wait(1000)
        cy.reload()
        cy.wait(1000)
        cy.get('.mat-icon').click()
        cy.get('.mat-menu-content > :nth-child(1)').click()
        cy.wait(500)
        cy.contains('The archive is still under construction! Check back after sprint 3!')
    })
})