import { generateRandomName, generateRandomPhone } from '../utils/random';

Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from failing the test
  return false;
});

describe('User Story 1-3', () => {
  beforeEach(() => {
    cy.viewport(1440, 900);
  });

  it('US1-3-T4' , () => {

    //HomePage
    cy.visit('http://localhost:3000')

    cy.get('a[href="/api/auth/login"]').first().click()
    cy.wait(5000)

    //Register Page
    cy.get('input').eq(0).type("ten@gmail.com")
    cy.get('input').eq(1).type("123456")
    cy.get('button').contains('Sign In').click()
    cy.wait(5000)

    cy.get('a[href="/campground"]').first().click()
    cy.wait(5000)



    //AllCampground Page
    cy.get('div').contains('Thammachard').click()
    cy.wait(5000)

    //Phu Tub Berk Page
    cy.get('[data-test="addCommentBlock"]').type('This is a test commenttt') // Type the comment text
      cy.get('button').contains('Add').click() // Click the "Add" button
      cy.wait(5000)

    cy.on('window:alert',(alert)=>{
      //Assertion
      expect(alert).to.contains('Error creating comment')
      })
      cy.wait(5000)
    })

    it('US1-3-T5', () => {
        // HomePage
        cy.visit('http://localhost:3000');
        cy.get('a[href="/api/auth/login"]').first().click();
        cy.wait(5000);
    
        // Login Page
        cy.get('input').eq(0).type('ten@gmail.com');
        cy.get('input').eq(1).type('123456');
        cy.get('button').contains('Sign In').click();
        cy.wait(5000);
    
        cy.get('a[href="/campground"]').first().click();
        cy.wait(5000);
    
        // AllCampground Page
        cy.get('div').contains('Thammachard').click();
        cy.wait(5000);
    
        // Phu Tub Berk Page - First Round
        cy.get('input[value=4]').click({ force: true }); // Click the 4-star rating
        cy.get('[data-test="addCommentBlock"]').type('This is first test comment'); // Type the comment text
        cy.get('button').contains('Add').click(); // Click the "Add" button
        cy.wait(5000);
    
        cy.on('window:alert', (alert) => {
          // Assertion
          expect(alert).to.contains('Error creating comment');
        });
      });

  it('US1-3-T6', () => {
    // HomePage
    cy.visit('http://localhost:3000');
    cy.get('a[href="/api/auth/login"]').first().click();
    cy.wait(5000);

    // Login Page
    cy.get('input').eq(0).type('ten@gmail.com');
    cy.get('input').eq(1).type('123456');
    cy.get('button').contains('Sign In').click();
    cy.wait(5000);

    cy.get('a[href="/campground"]').first().click();
    cy.wait(5000);

    // AllCampground Page
    cy.get('div').contains('Thammachard').click();
    cy.wait(5000);

    // Phu Tub Berk Page - First Round
    cy.get('input[value=4]').click({ force: true }); // Click the 4-star rating
    cy.get('[data-test="addCommentBlock"]').type('This is first test comment'); // Type the comment text
    cy.get('button').contains('Add').click(); // Click the "Add" button
    cy.wait(5000);

    cy.on('window:alert', (alert) => {
      // Assertion
      expect(alert).to.contains('Error creating comment');
    });

    // Phu Tub Berk Page - Second Round
    cy.get('input[value=3]').click({ force: true }); // Click the 3-star rating
    cy.get('[data-test="addCommentBlock"]').clear().type('This is another test comment'); // Change the comment text
    cy.get('button').contains('Add').click(); // Click the "Add" button
    cy.wait(5000);

    cy.on('window:alert', (alert) => {
      // Assertion
      expect(alert).to.contains('Error creating comment');
    });
  });
});