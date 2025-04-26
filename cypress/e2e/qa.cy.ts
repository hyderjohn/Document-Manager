describe("QA Section", () => {
  beforeEach(() => {
    // Login first
    cy.visit("/login");
    cy.get('input[name="email"]').type("test@example.com");
    cy.get('input[name="password"]').type("password123");
    cy.get('button[type="submit"]').click();
    cy.visit("/qa");
  });

  it("should display QA section page", () => {
    cy.get("h1").should("contain", "QA Section");
  });

  it("should show document selection dropdown", () => {
    cy.get('select[name="document"]').should("exist");
    cy.get('select[name="document"] option').should("have.length.at.least", 1);
  });

  it("should allow asking questions about selected document", () => {
    cy.get('select[name="document"]').select("1");
    cy.get('textarea[name="question"]').type("What is this document about?");
    cy.get('button[type="submit"]').click();
    cy.get(".answer-section").should("be.visible");
  });

  it("should show loading state while processing question", () => {
    cy.get('select[name="document"]').select("1");
    cy.get('textarea[name="question"]').type("What is this document about?");
    cy.get('button[type="submit"]').click();
    cy.get(".loading-spinner").should("be.visible");
  });

  it("should show error message when no document is selected", () => {
    cy.get('textarea[name="question"]').type("What is this document about?");
    cy.get('button[type="submit"]').click();
    cy.get(".toast-error").should("be.visible");
  });

  it("should show error message on failed question processing", () => {
    cy.intercept("POST", "/api/qa/ask", {
      statusCode: 500,
      body: { error: "Failed to process question" },
    });

    cy.get('select[name="document"]').select("1");
    cy.get('textarea[name="question"]').type("What is this document about?");
    cy.get('button[type="submit"]').click();
    cy.get(".toast-error").should("be.visible");
  });

  it("should maintain question history", () => {
    cy.get('select[name="document"]').select("1");
    cy.get('textarea[name="question"]').type("First question?");
    cy.get('button[type="submit"]').click();
    cy.get(".question-history").should("contain", "First question?");
  });
});
