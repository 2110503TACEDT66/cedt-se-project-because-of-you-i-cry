import {generateRandomName , generateRandomPhone} from '../utils/random'

Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from failing the test
  return false
})

describe('User Story 1-2', () => {

  beforeEach(() => {
      cy.viewport(1440,900)
  })

  it('US1-2-T1' , () => {

    //HomePage
    cy.visit('http://localhost:3000')
    cy.get('a[href="/campground"]').first().click()
    cy.wait(3000)

    //AllCampground Page
    cy.get('div').contains('Phu Tub Berk').click()
    cy.wait(3000)

    //Phu Tub Berk Page
    cy.get('input[value=4]').click({ force: true })
    cy.get('button').contains('Add').click()

    cy.on('window:alert',(alert)=>{
      //Assertion
      expect(alert).to.contains('Error creating comment')
      })
    cy.wait(3000)
    })

  //   //========================================================================================================================

    it('US1-2-T2' , () => {

      //HomePage
      cy.visit('http://localhost:3000')
      cy.get('a[href="/api/auth/login"]').first().click()
      cy.wait(3000)
      
      //Login Page
      cy.get('a').eq(1).click() //Second Element
      cy.wait(3000)

      //Register Page
      cy.get('input').eq(0).type(generateRandomName())
      cy.get('input').eq(1).type(generateRandomName() + "@gmail.com")
      cy.get('input').eq(2).type("123456")
      cy.get('input').eq(3).type(generateRandomPhone())
      cy.get('button').contains('Register').click()
      cy.wait(3000)

      //HomePage
      cy.get('a[href="/campground"]').first().click()
      cy.wait(3000)

      //Phu Tub Berk Page
      cy.get('div').contains('Phu Tub Berk').click()
      cy.wait(3000)

      
      cy.get('[data-test="commentBlock"]').then(() => {

        if (Cypress.$('[data-test="commentBlock"]').children().length == 0) {
            
          cy.get('input[value=4]').click({ force: true })
          cy.get('button').contains('Add').click()
          cy.wait(3000)

          cy.get('[data-test="commentBlock"]').children().should('have.length' , 0)
            
        }
        else {

          cy.get('[data-test="commentBlock"]').children().then(($children : any) => {
            const initialChildCount = $children.length
    
            cy.get('input[value=4]').click({ force: true })
            cy.get('button').contains('Add').click()
            cy.wait(3000)
    
            cy.get('[data-test="commentBlock"]') .children().then(($childrenAfterProcess : any) => {
              expect(initialChildCount).equal($childrenAfterProcess.length)
            })
              
          })
        }
      })
      cy.wait(3000)

    })

  //   //========================================================================================================================

    it('US1-2-T3' , () => {

      cy.visit('http://localhost:3000/campground')
      cy.wait(3000)
      cy.get('div').contains('Phu Tub Berk').click()
      cy.wait(3000)

      //Date Picker
      cy.get('body')
      .then(($body) => {
        const mobilePickerSelector = `[data-test="mui-datepicker"] input[readonly]`;
        const isMobile = $body.find(mobilePickerSelector).length > 0;
        if (isMobile) {
       
          cy.get(mobilePickerSelector)
            .click(); 
          cy.get('[role="dialog"] [aria-label="calendar view is open, go to text input view"]')
            .click();
          cy.get(`[role="dialog"] [data-test="mui-datepicker"]`)
            .find('input')
            .clear()
            .type('03-01-2025');
          cy.contains('[role="dialog"] button', 'OK')
            .click();
        } else {
          cy.get(`[data-test="mui-datepicker"]`)
            .find('input')
            .clear()
            .type('03-01-2025');
        }
      });

      cy.get('button').contains('Reserve').click()
      cy.wait(3000)

      cy.get('button').contains('OK').click()
      cy.wait(3000)

      cy.get('a[href="/campground"]').first().click()
      cy.wait(3000)

      cy.get('div').contains('Phu Tub Berk').click()
      cy.wait(3000)

      cy.get('[data-test="commentBlock"]').then(() => {

        if (Cypress.$('[data-test="commentBlock"]').children().length == 0) {
            
          cy.get('input[value=4]').click({ force: true })
          cy.get('button').contains('Add').click()
          cy.wait(3000)

          cy.get('[data-test="commentBlock"]') .children().should('have.length' , 0)
            
        }
        else {

          cy.get('[data-test="commentBlock"]').children().then(($children : any) => {
            const initialChildCount = $children.length
    
            cy.get('input[value=4]').click({ force: true })
            cy.get('button').contains('Add').click()
            cy.wait(3000)
    
            cy.get('[data-test="commentBlock"]') .children().then(($childrenAfterProcess : any) => {
              expect(initialChildCount).equal($childrenAfterProcess.length)
            })
              
          })
        }
      })

      cy.wait(3000)

    })

    //========================================================================================================================

    it('US1-2-T4 | US1-2-T5' , () => {
      for (let i = 1 ; i <= 2 ; i++) {
        cy.visit('http://localhost:3000/api/auth/signout')
        cy.wait(3000)

        cy.get('button').contains('Logout').click()
        cy.wait(3000)

        cy.visit('http://localhost:3000')
        cy.get('a[href="/api/auth/login"]').first().click()
        cy.wait(3000)

        cy.get('input').eq(0).type('testreservationuser@gmail.com')
        cy.get('input').eq(1).type('123456')
        cy.get('button').contains('Sign In').click()
        cy.wait(3000)

        cy.visit('http://localhost:3000/campground')
        cy.wait(3000)
        cy.get('div').contains('Phu Tub Berk').click()
        cy.wait(3000)

        cy.get('[data-test="commentBlock"]').then(() => {

          if (Cypress.$('[data-test="commentBlock"]').children().length == 0) {
              
            cy.get('input[value=4]').click({ force: true })
            cy.get('button').contains('Add').click()
            cy.wait(3000)
            cy.reload()
            cy.wait(3000)

            cy.get('[data-test="commentBlock"]').children().should('have.length' , 1)
              
          }
          else {

            cy.get('[data-test="commentBlock"]').children().then(($children : any) => {
              let initialChildCount = $children.length
      
              cy.get('input[value=4]').click({ force: true })
              cy.get('button').contains('Add').click()
              cy.wait(3000)
              cy.reload()
              cy.wait(3000)
              cy.get('[data-test="commentBlock"]') .children().then(($childrenAfterProcess : any) => {
                expect(initialChildCount + 1).equal($childrenAfterProcess.length)
              })              
            })
          }
        })
        cy.wait(5000)

      }
  

    })
    
})