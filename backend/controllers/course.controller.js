let Course = require("../models/course.model");
let User = require("../models/user.model");

exports.index = function(req, res) {
  Course.find()
    .then(courses => res.json(courses))
    .catch(err => res.status(400).json("Error => " + err));
};

exports.store = function(req, res) {
  const payload = {
    name: req.body.name,
    code: req.body.code,
    status: req.body.status,
    classlist: req.body.classlist
  };

  const course = new Course(payload);
  course
    .save()
    .then(() => res.json("Course added"))
    .catch(err => res.status(400).json("Error => " + err));
};

exports.show = function(req, res) {
  Course.findById(req.params.id)
    .then(course => res.json(course))
    .catch(err => res.status(400).json("Error => " + err));
};

exports.update = function(req, res) {
  Course.findById(req.params.id)
    .then(course => {
      course.name = req.body.name || course.name;
      course.code = req.body.code || course.code;
      course.status = req.body.status || course.status;
      course.classlist = req.body.classlist || course.classlist;
      course
        .save()
        .then(() => res.json([course, "Course updated"]))
        .catch(err => res.status(400).json("Error => " + err));
    })
    .catch(err => res.status(400).json("Error => " + err));
};

exports.destroy = function(req, res) {
  Course.findByIdAndDelete(req.params.id)
    .then(() => res.json("Course deleted"))
    .catch(err => res.status(400).json("Error => " + err));
};


//Added by Sruthi ---- starts here
//function to register a user to course
exports.registerUser = function(req,res) {

    Course.findById(req.params.courseId)
    .then(course => {
      course.name = req.body.name || course.name;
      course.code = req.body.code || course.code;
      course.status = req.body.status || course.status;
      course.classlist.push(req.params.userId);
      course
      .save()
      .then(() => res.json("User successfully added to " + course.name))
      .catch(err => res.status(400).json("Error => " + err));
    })
    .catch(err => res.status(400).json("Error => " + err));

    User.findById(req.params.userId)
    .then(user => {
      user.firstname = req.body.firstname || user.firstname;
      user.lastname = req.body.lastname || user.lastname;
      user.username = req.body.username || user.username;
      user.email = req.body.email || user.email;
      user.type = req.body.type || user.type;
      user.status = req.body.status || user.status;
      user.courselist.push(req.params.courseId);
      user
      .save()
      .then(() => res.json("Course successfully added to " + user.firstname))
      .catch(err => res.status(400).json("Error => " + err));
    })
    .catch(err => res.status(400).json("Error => " + err));
};


//function to drop a course for user
exports.dropCourse = function(req,res) {

    Course.findById(req.params.courseId)
    .then(course => {
      course.name = req.body.name || course.name;
      course.code = req.body.code || course.code;
      course.status = req.body.status || course.status;
      course.classlist.pull(req.params.userId);
      course
      .save()
      .then(() => res.json(course.name + " dropped"))
      .catch(err => res.status(400).json("Error => " + err));
    })
    .catch(err => res.status(400).json("Error => " + err));

    User.findById(req.params.userId)
    .then(user => {
      user.firstname = req.body.firstname || user.firstname;
      user.lastname = req.body.lastname || user.lastname;
      user.username = req.body.username || user.username;
      user.email = req.body.email || user.email;
      user.type = req.body.type || user.type;
      user.status = req.body.status || user.status;
      user.courselist.pull(req.params.courseId);
      user
      .save()
      .then(() => res.json("Course dropped for " + user.firstname))
      .catch(err => res.status(400).json("Error => " + err));
    })
    .catch(err => res.status(400).json("Error => " + err));
}

//show registered users of a course aka classlist
exports.showClassList = function(req, res) {
  Course.findById(req.params.id)
    .populate('classlist','_id firstname lastname email type')
    .exec(function (err, data) {
      if(err) return handleError(err);
      console.log(data.classlist);
      return res.send(data.classlist);
    });
};

//Added by Sruthi ---- ends here

//Other changes by Sruthi in this file:
//Replaced assigned_to field to classlist[]