describe("Student Creation", () => {
  it("Login", () => {
    const email = "parthjani7@yahoo.com";
    const password = "parth";
    cy.visit("/login");
    cy.get("#email").type(email);
    cy.get("#password").type(password);
    cy.get("#submit").click();
  });
  it("Create Teacher", () => {
    cy.get("#nav_users").click();
    cy.wait(2000);
    cy.get("#add_teacher_btn").click();
    const firstname = "John";
    const lastname = "Doe";
    const username = `teacher_${Math.floor(Math.random() * 10000)}`;
    const email = `teacher_${Math.floor(Math.random() * 10000)}@yahoo.com`;
    const password = "teacher001";
    cy.get("#firstname").type(firstname);
    cy.get("#lastname").type(lastname);
    cy.get("#username").type(username);
    cy.get("#email").type(email);
    cy.get("#password").type(password);
    cy.get("#submit").click();
  });
});
