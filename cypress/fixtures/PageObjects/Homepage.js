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

    verifyChatWindowIsOpen() {
        cy.get('#chat-window').its('0.contentDocument.body').as('btn')
        cy.get('@btn').then(cy.wrap).find('.chat-title').then((el) => {
            let txt = el.text()
            cy.log(txt)
            expect(txt).to.equal('Puffy Customer Support')
        })
    }

    closeChatWindow() {
        cy.get('#chat-button').its('0.contentDocument.body').then(cy.wrap).find('#gorgias-chat-messenger-button').click()
    }
}

export default Homepage