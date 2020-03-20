let Course = require("../models/course.model");

exports.index = function(req, res) {
  Course.find()
    .then(courses => res.json(courses))
    .catch(err => res.status(400).json("Error => " + err));
};

exports.store = function(req, res) {
  const coursename = req.body.coursename;
  const coursestatus = req.body.coursestatus;
  const teacherid = req.body.teacherid;

  const course = new Course({
    coursename,
    coursestatus,
    teacherid
  });
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
      course.coursename = req.body.coursename || course.coursename;
      course.coursestatus = req.body.coursestatus || course.coursestatus;
      course.teacherid = req.body.teacherid || course.teacherid;
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
