describe("Blog app", function() {
  beforeEach(function() {
    cy.visit("http://localhost:5173");
  })

  it("login page can be opened", function() {
    cy.contains("log in to application")
  });


  it("user can login", function() {
    cy.contains("log in to application")
  });
});

