let User = require("../models/user.model");
const bcrypt = require("bcryptjs");

exports.index = function(req, res) {
  const type = req.query.type;
  var filter = {};
  if (type) filter = { type };

  User.find(filter)
    .select("-password")
    .then(users => res.status(200).json(users))
    .catch(err => res.status(400).json("Error => " + err));
};

exports.show = function(req, res) {
  User.findById(req.params.id)
    .select("-password")
    .then(user => res.status(200).json(user))
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

      if (!req.body.password) {
        return user
          .save()
          .then(response => res.status(200).json())
          .catch(err => res.status(400).json(err));
      }

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
          if (err) throw err;
          user.password = hash;
          return user
            .save()
            .then(response => res.status(200).json())
            .catch(err => res.status(400).json(err));
        });
      });
    })
    .catch(err => res.status(400).json("Error => " + err));
};

exports.destroy = function(req, res) {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json("user deleted"))
    .catch(err => res.status(400).json("Error => " + err));
};

//code added by Sruthi - starts here
exports.showCourseList = function(req, res) {
  User.findById(req.params.id)
    .select("-password")
    .then(user => res.status(200).json(user.courselist))
    .catch(err => res.status(400).json("Error => " + err));
};


exports.isRegistered = function(req, res) {  
  var courselist;
  User.findById(req.params.userId) .exec(function (err, user){    
      
      courselist = user.courselist;
      console.log( courselist);

      console.log("Course id: " + req.params.courseId);
      for (var i = 0; i < courselist.length; i++)
      {
        if(courselist[i]==req.params.courseId)
        {
          console.log("Registered");
          return res.status(200).send("true");
        }
        else
        {
          console.log("Not Registered");
          return res.status(200).send("false");
        }
      }
});
}
//ends here