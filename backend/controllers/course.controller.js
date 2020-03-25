let Course = require("../models/course.model");

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
    assigned_to: req.body.assigned_to
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
      course.assigned_to = req.body.assigned_to || course.assigned_to;
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
