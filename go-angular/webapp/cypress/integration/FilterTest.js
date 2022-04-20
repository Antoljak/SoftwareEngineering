Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})

describe('Example', function() {
    it('Showcase', function() {
        cy.visit('localhost:4200/')
        cy.contains('Sign in with email').click()
        cy.get('#ui-sign-in-email-input').type("cypress@gmail.com")
        cy.contains('Next').click()
        cy.get('#ui-sign-in-password-input').type("password")
        cy.get('.firebaseui-id-submit').click()
        cy.wait(1000)
        cy.get('.mat-icon').click()
        cy.get('.mat-menu-content > :nth-child(1)').click()
        cy.get('.mat-form-field-flex').click()
        cy.contains("Green").click()
        cy.contains("Chemistry")
        cy.should('not.contain', 'Math')
        cy.should('not.contain', 'Physics')
        cy.should('not.contain', 'Biology')
    })
})