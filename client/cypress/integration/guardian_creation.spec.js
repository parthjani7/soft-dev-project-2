describe("Guardian Creation", () => {
  it("Login", () => {
    const email = "admin@yahoo.com";
    const password = "admin123";
    cy.visit("/login");
    cy.get("#email").type(email);
    cy.get("#password").type(password);
    cy.get("#submit").click();
  });
  it("Create Teacher", () => {
    cy.get("#nav_users").click();
    cy.wait(2000);
    cy.get("#add_guardian_btn").click();
    const firstname = "Some";
    const lastname = "guardian";
    const username = `guardian_${Math.floor(Math.random() * 10000)}`;
    const email = `guardian_${Math.floor(Math.random() * 10000)}@yahoo.com`;
    const password = "guardian001";
    cy.get("#firstname").type(firstname);
    cy.get("#lastname").type(lastname);
    cy.get("#username").type(username);
    cy.get("#email").type(email);
    cy.get("#password").type(password);
    cy.get("#submit").click();
  });
});
