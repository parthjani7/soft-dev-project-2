module.exports = function (app) {
  const express = require("express");
  var router = express.Router();

  var user = require("../controllers/user.controller");
  var course = require("../controllers/course.controller");
  var login = require("../controllers/login.controller");
  var assignment = require("../controllers/assignment.controller");

  // Auth
  router.post("/register", login.signup);
  router.post("/login", login.check);

  // Users
  router.get("/users", user.index);
  router.get("/users/:id", user.show);
  router.put("/users/:id", user.update);
  router.delete("/users/:id", user.destroy);

  //Courses
  router.get("/courses", course.index);
  router.post("/courses", course.store);
  router.get("/courses/:id", course.show);
  router.put("/courses/:id", course.update);
  router.delete("/courses/:id", course.destroy);

  // Assignments by course id
  router.get("/courses/:id/assignments", assignment.findWithCourse);
  router.post("/courses/:id/assignments", assignment.store); //Create an assignment in the given course(referred by course id)

  //Assignments
  router.get("/assignments", assignment.index); //List all assignments
  router.get("/assignments/:id", assignment.show); //Read
  router.get("/assignments/:id/submissions", assignment.showSubmissions);
  router.get("/assignments/:id/nonsubmissions", assignment.showNonSubmissions);
  router.put("/assignments/:id", assignment.update); //Update
  router.delete("/assignments/:id", assignment.destroy); //Delete

  //Added by Sruthi ---- starts here
  router.get("/courses/:courseId/:userId", course.registerUser); //register a user to a course
  router.delete("/courses/:courseId/:userId", course.dropCourse); //drop a course for user

  router.get("/classlist/:id", course.showClassList); //view users in a course
  router.get("/courselist/:username", user.showCourseList); //view courses for a user

  router.get("/isregistered/:courseId/:userId", user.isRegistered); //view courses for a user

  router.get("/submit/:assignmentId/:userId", assignment.submitUser);
  router.get("/remove/:assignmentId/:userId", assignment.removeSubmission);
  //Added by Sruthi ---- ends here

  app.use("/api/v1", router);
};
