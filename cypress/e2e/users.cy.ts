describe("User Management", () => {
  beforeEach(() => {
    // Login first
    cy.visit("/login");
    cy.get('input[name="email"]').type("test@example.com");
    cy.get('input[name="password"]').type("password123");
    cy.get('button[type="submit"]').click();
    cy.visit("/users");
  });

  it("should display user management page", () => {
    cy.get("h1").should("contain", "Users");
    cy.get("table").should("exist");
  });

  it("should show user list with correct columns", () => {
    cy.get("table thead th").should("have.length.at.least", 4);
    cy.get("table thead th").first().should("contain", "Name");
    cy.get("table thead th").eq(1).should("contain", "Email");
    cy.get("table thead th").eq(2).should("contain", "Role");
    cy.get("table thead th").eq(3).should("contain", "Status");
  });

  it("should add a new user", () => {
    cy.get("button").contains("Add User").click();
    cy.get('input[name="name"]').type("New User");
    cy.get('input[name="email"]').type("newuser@example.com");
    cy.get('select[name="role"]').select("User");
    cy.get('button[type="submit"]').click();
    cy.get(".toast-success").should("be.visible");
    cy.get("table tbody tr").should("contain", "New User");
  });

  it("should edit an existing user", () => {
    cy.get("table tbody tr").first().find("button").contains("Edit").click();
    cy.get('input[name="name"]').clear().type("Updated User");
    cy.get('button[type="submit"]').click();
    cy.get(".toast-success").should("be.visible");
    cy.get("table tbody tr").should("contain", "Updated User");
  });

  it("should delete a user", () => {
    cy.get("table tbody tr").first().find("button").contains("Delete").click();
    cy.get(".modal").should("be.visible");
    cy.get("button").contains("Confirm").click();
    cy.get(".toast-success").should("be.visible");
  });

  it("should show error message on failed user creation", () => {
    cy.intercept("POST", "/api/users", {
      statusCode: 500,
      body: { error: "User creation failed" },
    });

    cy.get("button").contains("Add User").click();
    cy.get('input[name="name"]').type("New User");
    cy.get('input[name="email"]').type("newuser@example.com");
    cy.get('select[name="role"]').select("User");
    cy.get('button[type="submit"]').click();
    cy.get(".toast-error").should("be.visible");
  });
});
