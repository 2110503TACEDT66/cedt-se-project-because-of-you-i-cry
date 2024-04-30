import {generateRandomName , generateRandomPhone} from '../utils/random'

describe('User Story 1-2', () => {

  beforeEach(() => {
      cy.viewport(1440,900)
  })

  it('US1-2-T1' , () => {

    //HomePage
    cy.visit('http://localhost:3000')
    cy.get('a[href="/campground"]').first().click()
    cy.wait(5000)

    //AllCampground Page
    cy.get('div').contains('Phu Tub Berk').click()
    cy.wait(5000)

    //Phu Tub Berk Page
    cy.get('input[value=4]').click({ force: true })
    cy.get('button').contains('Add').click()

    cy.on('window:alert',(alert)=>{
      //Assertion
      expect(alert).to.contains('Error creating comment')
      })
    })
    cy.wait(5000)

    //========================================================================================================================

    it('US1-2-T2' , () => {

      //HomePage
      cy.visit('http://localhost:3000')
      cy.get('a[href="/api/auth/login"]').first().click()
      cy.wait(5000)
      
      //Login Page
      cy.get('a').eq(1).click() //Second Element
      cy.wait(5000)

      //Register Page
      cy.get('input').eq(0).type(generateRandomName())
      cy.get('input').eq(1).type(generateRandomName() + "@gmail.com")
      cy.get('input').eq(2).type("123456")
      cy.get('input').eq(3).type(generateRandomPhone())
      cy.get('button').contains('Register').click()
      cy.wait(5000)

      //HomePage
      cy.get('a[href="/campground"]').first().click()
      cy.wait(5000)

      //Phu Tub Berk Page
      cy.get('div').contains('Phu Tub Berk').click()
      cy.wait(5000)

      
      cy.get('[data-test="commentBlock"]').then(() => {

        if (Cypress.$('[data-test="commentBlock"]').children().length == 0) {
            
          cy.get('input[value=4]').click({ force: true })
          cy.get('button').contains('Add').click()
          cy.wait(5000)

          cy.get('[data-test="commentBlock"]') .children().should('have.length' , 0)
            
        }
        else {

          cy.get('[data-test="commentBlock"]').children().then(($children : any) => {
            const initialChildCount = $children.length
    
            cy.get('input[value=4]').click({ force: true })
            cy.get('button').contains('Add').click()
            cy.wait(5000)
    
            cy.get('[data-test="commentBlock"]') .children().then(($childrenAfterProcess : any) => {
              expect(initialChildCount).equal($childrenAfterProcess.length)
            })
              
          })
        }
      })

      cy.wait(5000)

    })

    //========================================================================================================================

    it('US1-2-T3' , () => {

      cy.visit('http://localhost:3000/api/auth/logout')
      cy.get('Button').contains('Logout').click()

    })

    

    
    
})