module.exports = function(app) {
  var user = require("../controllers/user.controller");
  var course = require("../controllers/course.controller");
  var login = require("../controllers/login.controller");

  // Auth
  app.post("/users", login.signup);
  app.post("/login", login.check);

  // Users
  app.get("/users", user.index);
  app.get("/users/:id", user.show);
  app.put("/users/:id", user.update);
  app.delete("/users/:id", user.destroy);

  //Course
  app.get("/courses", course.index);
  app.post("/courses", course.store);
  app.get("/courses/:id", course.show);
  app.put("/courses/:id", course.update);
  app.delete("/courses/:id", course.destroy);
};
