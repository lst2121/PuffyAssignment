class Homepage {

    closePopUp() {
        cy.on('window:confirm', (str) => {
            cy.get('#subscribe-popup .popup__close').click()
        })
    }

    closeSubscriptionPopUp() {
        cy.get('#subscribe-popup',{timeout:20000}).should('be.visible')
        cy.get('#subscribe-popup .popup__close').click({force:true})
    }

    visitPuffyLuxPage() {
        cy.visit('products/puffy-lux-mattress')
    }

    clickOnChatIcon() {
        cy.get('.chaticon.active').click()
    }

}

export default Homepage