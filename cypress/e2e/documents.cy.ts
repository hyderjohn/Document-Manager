describe("Document Management", () => {
  beforeEach(() => {
    // Login first
    cy.visit("/login");
    cy.get('input[name="email"]').type("test@example.com");
    cy.get('input[name="password"]').type("password123");
    cy.get('button[type="submit"]').click();
    cy.visit("/documents");
  });

  it("should display document management page", () => {
    cy.get("h1").should("contain", "Documents");
    cy.get("table").should("exist");
  });

  it("should show document list with correct columns", () => {
    cy.get("table thead th").should("have.length", 6);
    cy.get("table thead th").first().should("contain", "Name");
    cy.get("table thead th").eq(1).should("contain", "Type");
    cy.get("table thead th").eq(2).should("contain", "Size");
    cy.get("table thead th").eq(3).should("contain", "Uploaded");
    cy.get("table thead th").eq(4).should("contain", "Status");
  });

  it("should upload a document", () => {
    const fileName = "test-document.pdf";
    cy.get('input[type="file"]').attachFile(fileName);
    cy.get(".toast-success").should("be.visible");
    cy.get("table tbody tr").first().should("contain", fileName);
  });

  it("should show processing status for new uploads", () => {
    const fileName = "test-document.pdf";
    cy.get('input[type="file"]').attachFile(fileName);
    cy.get("table tbody tr").first().find("span").should("contain", "processing");
  });

  it("should delete a document", () => {
    cy.get("table tbody tr").first().find("button").click();
    cy.get(".toast-success").should("be.visible");
    cy.get("table tbody tr").should("have.length", 2); // Assuming we start with 3 documents
  });

  it("should show error message on failed upload", () => {
    // Mock a failed upload by intercepting the request
    cy.intercept("POST", "/api/documents/upload", {
      statusCode: 500,
      body: { error: "Upload failed" },
    });

    const fileName = "test-document.pdf";
    cy.get('input[type="file"]').attachFile(fileName);
    cy.get(".toast-error").should("be.visible");
  });
});
