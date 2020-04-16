describe("Authentication", () => {
  it("Visit the app", () => {
    cy.visit("/login");
  });
  it("Login", () => {
    const email = "admin@yahoo.com";
    const password = "admin123";
    cy.visit("/login");
    cy.get("#email").type(email);
    cy.get("#password").type(password);
    cy.get("#submit").click();
  });
  it("Logout", () => {
    cy.wait(3000);
    cy.get("#nav_logout").click();
  });
});
