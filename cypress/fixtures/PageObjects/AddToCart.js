class AddToCart {


    clickAddToCartButton() {
        cy.get('#cta').click()
    }
    
    selectAnyMattress(i) {
        cy.get('.pd-variants--size .pd-buttons__item').eq(i).click() // i = 0 to 6
    }

    clickOnRemoveIcon() {
        cy.get('.cart-item__remove').eq(0).click({force:true})
    }

    clickOnConfirmRemoveButton() {
        cy.get('.jsItemRemove').click({force:true})
    }

    verifyItemsInCart(apialias) {
        cy.get(apialias).then((xhr) => {
            let obj = xhr.response.body
            cy.log(obj)
            cy.writeFile('cypress/fixtures/apiresponse.json',obj)
        })
        cy.fixture('apiresponse').then((data) => {
            this.data = data
        })
        cy.get('.cart-close__title').then((el) => {
            let txt = el.text()
            expect(txt).to.equal('Your Puffy Cart  '+ this.data.cartTotal+' Items')
        })
    }

}

export default AddToCart