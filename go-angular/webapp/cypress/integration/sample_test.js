Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})

describe('Example', function() {
    it('Click button', function() {
        cy.visit('localhost:4200/')
        cy.contains('menu').click()
        cy.contains('Save Note').click()
    })
})