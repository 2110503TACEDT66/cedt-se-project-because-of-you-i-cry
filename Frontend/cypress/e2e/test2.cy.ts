

describe('User Story 1-2', () => {

    beforeEach(() => {
        cy.viewport(1440 , 900)        
    })
  
    it('US1-2-T1' , () => {

        cy.intercept('GET','http://localhost:1234/api-informations/campgrounds?sort=-rating',
            {
                statusCode: 200,
                fixture: "moreThan3Campground"
            }
        ).as('MockOneCampgroundWithRating')

        cy.visit('http://localhost:3000/')

        cy.wait(3000)
        cy.get('[data-test="TrendingNow"]').find('[data-test="SliderCard"]').should('have.length' , 3)
        
    })

    it('US1-2-T2' , () => {

        cy.intercept('GET','http://localhost:1234/api-informations/campgrounds?sort=-rating',
            {
                statusCode: 200,
                fixture: "exact3Campground"
            }
        ).as('MockOneCampgroundWithRating')

        cy.visit('http://localhost:3000/')

        cy.wait(3000)
        cy.get('[data-test="TrendingNow"]').find('[data-test="SliderCard"]').should('have.length' , 3)
        
    })

    it('US1-2-T3' , () => {

        cy.intercept('GET','http://localhost:1234/api-informations/campgrounds?sort=-rating',
            {
                statusCode: 200,
                fixture: "lessThan3Campground"
            }
        ).as('MockOneCampgroundWithRating')

        cy.visit('http://localhost:3000/')

        cy.wait(3000)
        cy.get('[data-test="TrendingNow"]').find('[data-test="SliderCard"]').should('have.length' , 2)
        
    })




})