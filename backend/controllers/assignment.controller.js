let Assignment = require("../models/assignment.model");
let Course = require("../models/course.model");

exports.index = function(req, res) {
  Assignment.find()
    .then(assignments => res.json(assignments))
    .catch(err => res.status(400).json(err));
};

exports.store = function(req, res) {

  Course.findById(req.params.id)
  .select('classlist')
    .exec(function (err, data) {
      if(err) return handleError(err);
      non_submission = data.classlist;

      const payload = {
        name: req.body.name,
        description: req.body.description,
        due: new Date(req.body.due),
        course: req.params.id,
        nonsubmissions: data.classlist
      };
      console.log(data.classlist);
      console.log(non_submission + "here");
      console.log(payload);
    
      // return;
      const assignment = new Assignment(payload);
      assignment
        .save()
        .then(response => res.status(201).json())
        .catch(err => res.status(400).json(err));

    });

  
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
  Assignment.find({ course: req.params.id })
    .then(assignments => res.json(assignments))
    .catch(err => res.status(400).json(err));
};

exports.showSubmissions = function(req,res) {
  Assignment.findById(req.params.id)
  .select('submissions')
  .then(user => res.json(user))
  .catch(err => res.status(400).json(err));

}

exports.showNonSubmissions = function(req,res) {
  Assignment.findById(req.params.id)
  .select('nonsubmissions')
  .then(user => res.json(user))
  .catch(err => res.status(400).json(err));

}