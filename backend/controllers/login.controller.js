let User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;
const jwtExpirySeconds = 300;

exports.signup = function(req, res) {
  const payload = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    type: req.body.type,
    status: req.body.status,
    studentusername: req.body.studentUsername
  };

  console.log(req.body);
  console.log(payload);

  const user = new User(payload);

  console.log("user" + user);

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) throw err;
      user.password = hash;
      return user
        .save()
        .then(response => res.status(201).json())
        .catch(err => res.status(400).json(err));
    });
  });
};

exports.check = function(req, res) {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email })
    .then(user => {
      if (!user) res.status(404);

      bcrypt.compare(password, user.password).then(isMatch => {
        if (!isMatch) return res.status(400).json();

        const payload = {
          id: user.id,
          username: user.username
        };

        jwt.sign(
          payload,
          secretKey,
          {
            algorithm: "HS256",
            expiresIn: jwtExpirySeconds
          },
          (err, token) => {
            res.json({
              id:user.id,
              username: user.username,
              type: user.type,
              token
            });
          }
        );
      });
    })
    .catch(err => res.status(400).json("Error => " + err));
};
