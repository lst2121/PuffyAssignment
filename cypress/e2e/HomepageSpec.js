/// <reference types="Cypress" />

import Homepage from "../fixtures/PageObjects/Homepage"

describe('Puffy Lux Home Page', function () {

    const HomepageMethods = new Homepage()

    beforeEach(function () {
        cy.clearAllCookies()
        cy.clearAllLocalStorage()
        cy.clearAllSessionStorage()
    })

    it('visit page', function () {
        HomepageMethods.visitPuffyLuxPage()
        cy.get('.header__logo-wrapper').should('be.visible')
    })

    it('verify button for Bed Frames icon', function () {
        HomepageMethods.visitPuffyLuxPage()
        cy.get('.header-nav__item').eq(0).click()
        cy.contains('Which Puffy Mattress is right for you?').should('be.visible')
    })

    it('verify button for mattresses icon', function () {
        HomepageMethods.visitPuffyLuxPage()
        cy.get('.header-nav__item').eq(1).click()
        cy.contains('Modern Bed Frames').should('be.visible')
    })

    it('verify button for Bedding icon', function () {
        HomepageMethods.visitPuffyLuxPage()
        cy.get('.header-nav__item').eq(2).click()
        cy.contains('Ultra-cozy Bedding Collection').should('be.visible')
    })

    it('verify button for Bedroom icon', function () {
        HomepageMethods.visitPuffyLuxPage()
        cy.get('.header-nav__item').eq(3).click()
        cy.contains('Lux Bedroom Essentials').should('be.visible')
    })

    it('verify button for Reviews icon', function () {
        HomepageMethods.visitPuffyLuxPage()
        cy.get('.header-nav__item').eq(4).click()
        cy.contains('Don’t take our word for it, see what thousands of happy sleepers have to say!').should('be.visible')
    })

    it('verify button for Support icon', function () {
        HomepageMethods.visitPuffyLuxPage()
        cy.get('.header-nav__item').eq(5).click()
        cy.contains('Puffy Support').should('be.visible')
    })

    it('verify button for Sale icon', function () {
        HomepageMethods.visitPuffyLuxPage()
        cy.get('.header-nav__item').eq(6).click()
        cy.contains("New Year's Sale").should('be.visible')
    })

    it('verify button for Stores icon', function () {
        HomepageMethods.visitPuffyLuxPage()
        cy.get('.header-nav__item').eq(7).click()
        cy.contains('FIND A LOCATION').should('be.visible')
    })

    it('verify chat icon is working', function () {
        HomepageMethods.visitPuffyLuxPage()
        HomepageMethods.clickOnChatIcon()
        HomepageMethods.closeSubscriptionPopUp()
        HomepageMethods.verifyChatWindowIsOpen()
        HomepageMethods.closeChatWindow()
    })
})