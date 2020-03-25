let Assignment = require("../models/assignment.model");

exports.index = function(req, res) {
  Assignment.find()
    .then(assignments => res.json(assignments))
    .catch(err => res.status(400).json("Error => " + err));
};

exports.store = function(req, res) {
  const name = req.body.name;
  const status = req.body.status;
  const description = req.body.description;
  const due = req.body.due;
  const course = req.params.courseid;

  const assignment = new Assignment({
    name,
    status,
    description,
    due,
    course
  });
  assignment
    .save()
    .then(() => res.json("Assignment added"))
    .catch(err => res.status(400).json("Error => " + err));
};

exports.show = function(req, res) {
  Assignment.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => res.status(400).json("Error => " + err));
};

exports.update = function(req, res) {
  Assignment.findById(req.params.id)
    .then(assignment => {
      assignment.name = req.body.name || assignment.name;
      assignment.status = req.body.status || assignment.status;
      assignment.description = req.body.description || assignment.description;
      assignment.due = req.body.due || assignment.due;
      assignment.course = req.body.course || assignment.course;
      assignment
        .save()
        .then(() => res.json([assignment, "Assignment updated"]))
        .catch(err => res.status(400).json("Error => " + err));
    })
    .catch(err => res.status(400).json("Error => " + err));
};

exports.destroy = function(req, res) {
  Assignment.findByIdAndDelete(req.params.id)
    .then(() => res.json("Assignment deleted"))
    .catch(err => res.status(400).json("Error => " + err));
};

exports.findWithCourse = function(req, res) {
  Assignment.find({course: req.params.courseid})
    .then(assignments => res.json(assignments))
    .catch(err => res.status(400).json("Error => " + err));
};
