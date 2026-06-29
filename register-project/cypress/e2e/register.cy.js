
import {errorMessages} from '../../src/components/Register'

describe('register sayfasi', () => {

  beforeEach(() => {
    cy.visit('http://localhost:5173/')
  })

  describe('error messages', () => {
    it('name input throws error for 2 chars', () => {
      //Arrange
      //cy.visit('http://localhost:5173/')
      //Act
      cy.get('[data-cy="ad-input"]').type('em')
      //Assert
      cy.contains(errorMessages.ad);
    })
    it('soyad input throws error for 2 chars', () => {
      //Arrange
      cy.visit('http://localhost:5173/')
      //Act
      cy.get('[data-cy="soyad-input"]').type('em')
      //Assert
      cy.contains(errorMessages.soyad);

    })
    it('Email input throws error for emre@wit.edu.tr', () => {
      //Arrange
      //cy.visit('http://localhost:5173/')
      //Act
      cy.get('[data-cy="email-input"]').type('em')
      //Assert
      cy.contains(errorMessages.email);

    })
    it('password input throws error for 1234', () => {
      //Arrange
      //cy.visit('http://localhost:5173/')
      //Act
      cy.get('[data-cy="password-input"]').type('1234')
      //Assert
      cy.contains(errorMessages.password);

    })
    it('button is disabled for unvalidated inpıts.', () => {
      //Arrange
      //cy.visit('http://localhost:5173/')
      //Act
     // cy.get('[data-cy="button-input"]').type('1234')
      //Assert
      cy.get('[data-cy="submit-button"]').should('be.disabled');
    })
  })


   describe('Form input validated',() => {
// it.skip dersek o testi atlar,
//it.only dersek sadece o test çalışır

    it('button is enabled for validated inpıts.', () => {
      // Arrange
      //cy.visit('http://localhost:5173/')
      cy.get('[data-cy="ad-input"]').type('Emre')
      cy.get('[data-cy="soyad-input"]').type('Cetin')
      cy.get('[data-cy="email-input"]').type('emre@wit.com.tr')
      cy.get('[data-cy="password-input"]').type('Emre.356356')
      //Assert
      cy.get('[data-cy ="submit-button"]').should("be.enabled")
    })
  })

  describe('submit form on validated inputs gets id?',() => {
// it.skip dersek o testi atlar,
//it.only dersek sadece o test çalışır

    it('button is enabled for validated inpıts.', () => {
      // Arrange
      //cy.visit('http://localhost:5173/')
      //Assert
      cy.get('[data-cy="ad-input"]').type('Mehmet')
      cy.get('[data-cy="soyad-input"]').type('Cetin')
      cy.get('[data-cy="email-input"]').type('emre@wit.com.tr')
      cy.get('[data-cy="password-input"]').type('Emre.356356')
      cy.get('[data-cy ="submit-button"]').click()
      
      //Arrange

      cy.get('[data-cy="id-output"]').should("exist")
    })
  })

})
//cypress i kurarken bu sayfada "describe is not defined" gibi eslint hatalarını önlemk için bir plug in yükleyip eslint.config dosyasında düzenlemeler yaptım
// test 3 adımda yapılıyor Arrange hazırlık yani sitenin ziyaret edilmesi
// act seçiciler ile elementlerin seçilmesi
//assert sonuçların .should vs gibi test edilmesi
//test'e dahil edeceğim elementlere data-cy attribute u ile seciciler tanımadım.