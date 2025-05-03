describe("Dashboard", () => {
  beforeEach(() => {
    cy.visit("/login");
    cy.get('input[id="email"]').type("admin@example.com");
    cy.get('input[id="password"]').type("admin123");
    cy.get('button[type="submit"]').click();
    // Wait for login to complete and redirect
    cy.url().should("not.include", "/login");
  });

  it("should display dashboard page", () => {
    cy.get("h1").should("contain", "Dashboard");
  });

  it("should show document statistics", () => {
    cy.get(".grid.grid-cols-1.md\\:grid-cols-3 > div").should("have.length", 3);
    cy.get(".grid.grid-cols-1.md\\:grid-cols-3 > div").first().should("contain", "Total Documents");
    cy.get(".grid.grid-cols-1.md\\:grid-cols-3 > div").eq(1).should("contain", "Active Users");
    cy.get(".grid.grid-cols-1.md\\:grid-cols-3 > div").eq(2).should("contain", "Processing Queue");
  });

  it("should show recent documents", () => {
    cy.get(".grid.grid-cols-1.lg\\:grid-cols-2 > div").first().should("contain", "Recent Activity");
    cy.get(".grid.grid-cols-1.lg\\:grid-cols-2 > div").last().should("contain", "Document Status Overview");
  });

  it("should navigate to documents page", () => {
    cy.contains("Documents").click();
    cy.url().should("include", "/documents");
  });

  it("should navigate to users page", () => {
    cy.contains("Users").click();
    cy.url().should("include", "/users");
  });

  it("should navigate to QA section", () => {
    cy.contains("Q&A").click();
    cy.url().should("include", "/qa");
  });
});
