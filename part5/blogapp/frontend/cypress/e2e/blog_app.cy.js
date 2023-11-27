describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/tests/reset");
    const user = {
      username: "test",
      password: "test",
      name: "Test Test",
    };
    cy.request("POST", "http://localhost:3001/api/users", user);
    cy.visit("http://localhost:5173");
  });

  it("login page can be opened", function () {
    cy.contains("log in to application");
  });

  it("user can login", function () {
    cy.contains("login");
    cy.get("#username").type("test");
    cy.get("#password").type("test");
    cy.get("#btn-login").click();

    cy.contains("Test Test logged in");
  });

  describe("when user logged in", function () {
    beforeEach(function () {
      cy.contains("login");
      cy.get("#username").type("test");
      cy.get("#password").type("test");
      cy.get("#btn-login").click();
    });

    it("can create new blog", function () {
      cy.contains("new blog").click();

      cy.get("#blog-title").type("test from cypress");
      cy.get("#blog-author").type("test");
      cy.get("#blog-url").type("test url");
      cy.get("#btn-create-blog").click();

      cy.contains("test from cypress");
    });
  });
});
