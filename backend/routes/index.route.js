module.exports = function(app) {
  var user = require("../controllers/user.controller");
  var course = require("../controllers/course.controller");
  var login = require("../controllers/login.controller");
  var assignment = require("../controllers/assignment.controller");

  // Auth
  app.post("/register", login.signup);
  app.post("/login", login.check);

  // Users
  app.get("/users", user.index);
  app.get("/users/:id", user.show);
  app.put("/users/:id", user.update);
  app.delete("/users/:id", user.destroy);

  //Courses
  app.get("/courses", course.index);
  app.post("/courses", course.store);
  app.get("/courses/:id", course.show);
  app.put("/courses/:id", course.update);
  app.delete("/courses/:id", course.destroy);

  // Assignments by course id
  app.get("/courses/:id/assignments", assignment.findWithCourse);
  app.post("/courses/:id/assignments", assignment.store); //Create an assignment in the given course(referred by course id)

  //Assignments
  app.get("/assignments", assignment.index); //List all assignments
  app.get("/assignments/:id", assignment.show); //Read
  app.put("/assignments/:id", assignment.update); //Update
  app.delete("/assignments/:id", assignment.destroy); //Delete
};
