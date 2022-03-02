describe('Example', function() {
    it('Click button', function() {
        cy.visit('localhost:4200/')

        cy.contains('Continue as guest').click()

        cy.contains('Note-It')
    })
})