describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", `${Cypress.env("BACKEND")}/tests/reset`);
    const user = {
      username: "test",
      password: "test",
      name: "Test Test",
    };
    cy.request("POST", `${Cypress.env("BACKEND")}/users`, user);
    const user2 = {
      username: "test2",
      password: "test2",
      name: "Test2 Test2",
    };
    cy.request("POST", `${Cypress.env("BACKEND")}/users`, user2);
    cy.visit("");
  });

  it("login page can be opened", function () {
    cy.contains("log in to application");
  });

  describe("Login", function () {
    it("user can login", function () {
      cy.contains("login");
      cy.get("#username").type("test");
      cy.get("#password").type("test");
      cy.get("#btn-login").click();

      cy.contains("Test Test logged in");
    });

    it("invalid username or password", function () {
      cy.contains("login");
      cy.get("#username").type("fail");
      cy.get("#password").type("fail");
      cy.get("#btn-login").click();

      cy.get(".error")
        .should("exist")
        .and("have.css", "color", "rgb(255, 0, 0)");
    });
  });

  describe("when user logged in", function () {
    beforeEach(function () {
      cy.login({ username: "test", password: "test" });
    });

    it("can create new blog", function () {
      cy.contains("new blog").click();

      cy.get("#blog-title").type("test from cypress");
      cy.get("#blog-author").type("test");
      cy.get("#blog-url").type("test url");
      cy.get("#btn-create-blog").click();

      cy.contains("test from cypress");
    });

    describe("and blogs exists", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "test from cypress1",
          author: "test author1",
          url: "test url1",
        });
        cy.createBlog({
          title: "test from cypress2",
          author: "test author2",
          url: "test url2",
        });
        cy.createBlog({
          title: "test from cypress3",
          author: "test author3",
          url: "test url3",
        });
      });

      it("can view blog detail", function () {
        cy.contains("test from cypress2").contains("view").click();
        cy.get(".blog")
          .contains("test from cypress2")
          .should("not.have.css", "display", "none")
          .should("contain", "test url2")
          .and("contain", "Test Test");
      });

      it("can give likes", function () {
        cy.get(".blog").contains("test from cypress2").contains("view").click();

        cy.get(".blog").contains("test from cypress2").contains("like").click();
        cy.get(".blog").contains("test from cypress2").contains("like").click();

        cy.get(".blog")
          .contains("test from cypress2")
          .contains("like")
          .parent()
          .find("span")
          .should("contain", "2");
      });

      it("can delete a blog", function () {
        cy.get(".blog")
          .contains("test from cypress2")
          .contains("delete")
          .click();
        cy.get(".blog").contains("test from cypress2").should("not.exist");
      });

      it("only the creator can delete blog", function () {
        cy.login({ username: "test2", password: "test2" });
        cy.get(".blog")
          .contains("test from cypress2")
          .contains("delete")
          .should("not.exist");
      });
    });
  });
});
