let User = require("../models/user.model");

exports.index = function(req, res) {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json("Error => " + err));
};

exports.store = function(req, res) {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const type = req.body.type;
  const status = req.body.status;

  const user = new User({
    firstname,
    lastname,
    username,
    email,
    password,
    type,
    status
  });
  user
    .save()
    .then(() => res.json("User added"))
    .catch(err => res.status(400).json("Error => " + err));
};

exports.show = function(req, res) {
  User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => res.status(400).json("Error => " + err));
};

exports.update = function(req, res) {
  User.findById(req.params.id)
    .then(user => {
      user.firstname = req.body.firstname || user.firstname;
      user.lastname = req.body.lastname || user.lastname;
      user.username = req.body.username || user.username;
      user.email = req.body.email || user.email;
      user.password = req.body.password || user.password;
      user.type = req.body.type || user.type;
      user.status = req.body.status || user.status;
      user
        .save()
        .then(() => res.json([user, "User updated"]))
        .catch(err => res.status(400).json("Error => " + err));
    })
    .catch(err => res.status(400).json("Error => " + err));
};

exports.destroy = function(req, res) {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json("user deleted"))
    .catch(err => res.status(400).json("Error => " + err));
};
