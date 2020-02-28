module.exports = function(app) {
  var user = require("../controllers/user.controller");

  // Users
  app.get("/users/", user.index);
  app.post("/users/", user.store);
  app.get("/users/:id", user.show);
  app.put("/users/:id", user.update);
  app.delete("/users/:id", user.destroy);
};
