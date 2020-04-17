describe("Authentication", () => {
  it("Visit the app", () => {
    cy.visit("/login");
  });
  it("Login", () => {
    const email = "parthjani7@yahoo.com";
    const password = "parth";
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
