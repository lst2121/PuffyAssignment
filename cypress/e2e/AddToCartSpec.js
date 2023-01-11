/// <reference types="Cypress" />

import Homepage from "../fixtures/PageObjects/Homepage"
import AddToCart from "../fixtures/PageObjects/AddToCart"

describe('Puffy Lux Page Add To Cart', function () {

    const HomepageMethods = new Homepage()
    const AddToCartMethods = new AddToCart()

    beforeEach(function () {
        cy.clearAllCookies()
        cy.clearAllLocalStorage()
        cy.clearAllSessionStorage()
    })

    it('click on add to cart', function () {
        cy.intercept('GET','https://puffy.com/cart?view=api').as('viewCart')
        HomepageMethods.visitPuffyLuxPage()
        AddToCartMethods.selectAnyMattress(4)
        AddToCartMethods.clickAddToCartButton()
        cy.wait('@viewCart')
        HomepageMethods.closeSubscriptionPopUp()
        cy.wait(3000)
        AddToCartMethods.verifyItemsInCart('@viewCart')
    })

    it('varify remove itmes from cart', function () {
        cy.intercept('GET','https://puffy.com/cart?view=api').as('viewCart')
        HomepageMethods.visitPuffyLuxPage()
        AddToCartMethods.selectAnyMattress(4)
        AddToCartMethods.clickAddToCartButton()
        cy.wait('@viewCart')
        HomepageMethods.closeSubscriptionPopUp()
        cy.get('.header-sidenav__cart').click({force:true})
        cy.get('#overlay').scrollIntoView()
        AddToCartMethods.clickOnRemoveIcon()
        cy.intercept('GET','https://puffy.com/cart?view=api').as('removeCart')
        //cy.wait(3000)
        AddToCartMethods.clickOnConfirmRemoveButton()
        cy.wait('@removeCart')
        //AddToCartMethods.verifyItemsInCart('@removeCart')
        cy.get('@removeCart').then((xhr) => {
            let obj = xhr.response.body
            cy.log(obj)
            cy.writeFile('cypress/fixtures/apiresponse.json',obj)
        })
        cy.wait(3000)
        cy.fixture('apiresponse.json').then((data) => {
            this.data = data
            cy.log(this.data.cartTotal)
        })

        //cy.log(this.data.cartTotal)
        cy.get('.cart-close__title').then((el) => {
            let txt = el.text()
            expect(txt).to.equal('Your Puffy Cart  '+ this.data.cartTotal+' Items')
        })
    })

    it('checkout from the cart', () => {
        cy.intercept('GET','https://puffy.com/cart?view=api').as('viewCart')
        HomepageMethods.visitPuffyLuxPage()
        AddToCartMethods.selectAnyMattress(4)
        AddToCartMethods.clickAddToCartButton()
        cy.wait('@viewCart')
        HomepageMethods.closeSubscriptionPopUp()
        cy.get('.cart-checkout__action .jsCheckoutSubmit').click({force:true})
        cy.wait(2000)
        cy.get('#focusDiscount .focus-discount-code').click({force:true})
        cy.get('#checkout_reduction_code').type('SAVE1350',{force:true})
        cy.get('#checkout_submit').click({force:true})
        cy.wait(3000)
        cy.contains(' Discount Applied').should('be.visible')
    })


})