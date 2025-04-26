describe("Authentication", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("should display login form", () => {
    cy.get("form").should("exist");
    cy.get('input[name="email"]').should("exist");
    cy.get('input[name="password"]').should("exist");
    cy.get('button[type="submit"]').should("exist");
  });

  it("should show error message with invalid credentials", () => {
    cy.get('input[name="email"]').type("invalid@example.com");
    cy.get('input[name="password"]').type("wrongpassword");
    cy.get('button[type="submit"]').click();
    cy.get(".toast-error").should("be.visible");
  });

  it("should successfully login with valid credentials", () => {
    cy.get('input[name="email"]').type("test@example.com");
    cy.get('input[name="password"]').type("password123");
    cy.get('button[type="submit"]').click();
    cy.url().should("not.include", "/login");
    cy.get(".toast-success").should("be.visible");
  });

  it("should navigate to register page", () => {
    cy.get('a[href="/register"]').click();
    cy.url().should("include", "/register");
  });
});
