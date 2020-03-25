let User = require("../models/user.model");
const session = require('express-session');
const bcrypt = require('bcryptjs');

exports.index = function(req, res) {
  User.find()
    .then(users => res.json(users))
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
      user.type = req.body.type || user.type;
      user.status = req.body.status || user.status;

      // if (req.body.password) {
      //   bcrypt.genSalt(10, (err, salt) => {
      //     bcrypt.hash(req.body.password, salt, (err, hash) => {
      //       if (err) throw err;
            user.password = req.body.password;
            user
              .save()
              .then(() => res.status(200))
              .catch(err => res.status(400).json(err));
        //   });
        // });
      //}
    })
    .catch(err => res.status(400).json("Error => " + err));
};

exports.destroy = function(req, res) {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json("user deleted"))
    .catch(err => res.status(400).json("Error => " + err));
};


//other functions

exports.signinfailure = function (req, res, next) {
  return res.status(401).send("Unauthorized");
};

exports.signinsuccess = function (req, res, next) {
   return res.status(200).json({
       email: session.user.email,
       firstname: session.user.firstname,
       lastname:session.user.lastname,
       type:session.user.type,
       isValid: true,
       isAuthorized: true
   });
};

