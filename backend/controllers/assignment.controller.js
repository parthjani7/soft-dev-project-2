let Assignment = require("../models/assignment.model");

exports.index = function(req, res) {
  Assignment.find()
    .then(assignments => res.json(assignments))
    .catch(err => res.status(400).json(err));
};

exports.store = function(req, res) {
  const payload = {
    name: req.body.name,
    status: req.body.status,
    description: req.body.description,
    due: req.body.due,
    course: req.params.courseid
  };

  const assignment = new Assignment(payload);
  assignment
    .save()
    .then(() => res.status(201))
    .catch(err => res.status(400).json(err));
};

exports.show = function(req, res) {
  Assignment.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => res.status(400).json(err));
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
        .catch(err => res.status(400).json(err));
    })
    .catch(err => res.status(400).json(err));
};

exports.destroy = function(req, res) {
  Assignment.findByIdAndDelete(req.params.id)
    .then(() => res.json("Assignment deleted"))
    .catch(err => res.status(400).json(err));
};

exports.findWithCourse = function(req, res) {
  Assignment.find({ course: req.params.courseid })
    .then(assignments => res.json(assignments))
    .catch(err => res.status(400).json(err));
};
