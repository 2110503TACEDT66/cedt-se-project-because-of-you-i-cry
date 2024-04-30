import {generateRandomName , generateRandomPhone} from '../utils/random'

describe('User Story 1-2', () => {

  beforeEach(() => {
      cy.viewport(1440,900)
  })

  it('US1-2-EC1' , () => {

    //HomePage
    cy.visit('http://localhost:3000')
    cy.get('a[href="/campground"]').first().click()
    cy.wait(1000)

    //AllCampground Page
    cy.get('div').contains('Phu Tub Berk').click()
    cy.wait(1000)

    //Phu Tub Berk Page
    cy.get('input[value=4]').click({ force: true });
    cy.get('button').contains('Add').click()

    cy.on('window:alert',(alert)=>{
      //Assertion
      expect(alert).to.contains('Error creating comment');
      })
    })

    it('US1-2-EC2' , () => {

      //HomePage
      cy.visit('http://localhost:3000')
      cy.get('a[href="/api/auth/login"]').first().click()
      cy.wait(1000)
      
      //Login Page
      cy.get('a').eq(1).click() //Second Element
      cy.wait(1000)

      //Register Page
      cy.get('input').eq(0).type(generateRandomName())
      cy.get('input').eq(1).type(generateRandomName() + "@gmail.com")
      cy.get('input').eq(2).type("123456")
      cy.get('input').eq(3).type(generateRandomPhone())
      cy.get('button').contains('Register').click()

      //HomePage
      cy.get('a[href="/campground"]').first().click()
      cy.wait(1000)

      //
      cy.get('div').contains('Phu Tub Berk').click()
      cy.wait(1000)
  
      //Phu Tub Berk Page
      cy.get('input[value=4]').click({ force: true });
      cy.get('button').contains('Add').click()
    })

    

    
    
})