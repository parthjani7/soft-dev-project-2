describe("Teacher Creation", () => {
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
    cy.get("#add_student_btn").click();
    const firstname = "SOme";
    const lastname = "Student";
    const username = `student_${Math.floor(Math.random() * 10000)}`;
    const email = `student_${Math.floor(Math.random() * 10000)}@yahoo.com`;
    const password = "student001";
    cy.get("#firstname").type(firstname);
    cy.get("#lastname").type(lastname);
    cy.get("#username").type(username);
    cy.get("#email").type(email);
    cy.get("#password").type(password);
    cy.get("#submit").click();
  });
});
