describe("Appointment", () => {
  beforeEach(function() {
    // runs before each test in this block
    cy.request("GET", "/api/debug/reset");

    cy.visit("/")

    cy.contains("Monday");
  });

  it("should book an interview", () => {
    cy.get("img[alt='Add']")
      .first()
      .click();
    
    cy.get("input[placeholder='Enter Student Name']")
      .type("Lydia Miller-Jones");

    cy.get("img[alt='Sylvia Palmer']")
      .click();

    cy.contains("Save")
      .click();

    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });

  it("should edit an interview", () => {
    cy.get("img[alt='Edit']")
      .first()
      .click({force: true});

    cy.get("input[placeholder='Enter Student Name']")
      .clear()
      .type("Bobby Bob");
    
    cy.get("img[alt='Tori Malcolm']")
      .click();
    
    cy.contains("Save")
      .click();

    cy.contains(".appointment__card--show", "Bobby Bob");
    cy.contains(".appointment__card--show", 'Tori Malcolm');
  });

  it("should cancel an interview", () => {
    cy.get("img[alt='Delete']")
      .first()
      .click({force: true});
    
    cy.contains("Confirm")
      .click();

    cy.contains("Deleting");

    cy.contains("Deleting")
      .should("not.exist");
    
    cy.contains(".appointment__card--show", "Archie Cohen")
      .should("not.exist");
  });
});