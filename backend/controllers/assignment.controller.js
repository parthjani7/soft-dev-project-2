let Assignment = require("../models/assignment.model");
let Course = require("../models/course.model");
let User = require("../models/user.model");

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
        course: req.params.id
      };
      console.log(data.classlist);
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
  .populate('submissions','_id firstname lastname email')
  .exec(function (err, data){
      if(err) return handleError(err);
      console.log(data.submissions);
      return res.send(data.submissions);
  });
}

exports.showNonSubmissions = function(req,res) {
  Assignment.findById(req.params.id)
  .exec(function (err, data){
      if(err) return handleError(err);
      const course_code = data.course;
      const submissions = data.submissions;

      Course.findById(course_code)
      .select('classlist')
      .exec(function (err,data){
        if(err) return handleError(err);
        const classlist = data.classlist;
        var nonsubmissions = classlist;

        Object.keys(classlist).forEach(function(key1) {
          Object.keys(submissions).forEach(function(key2) {
            if(JSON.stringify(classlist[key1])===JSON.stringify(submissions[key2]))
            {
              nonsubmissions.pull(classlist[key1]);
            }
          });
        });

        User.find({ _id: { $in: nonsubmissions}, type:'student'})
        .then(users => res.json(users))
        .catch(err => res.status(400).json(err));

      });
  });

  // Assignment.findById(req.params.id)
  // .populate('nonsubmissions','_id firstname lastname email')
  // .exec(function (err, data){
  //     if(err) return handleError(err);
  //     console.log(data.nonsubmissions);
  //     return res.send(data.nonsubmissions);
  // });
}

exports.submitUser = function(req,res) {
  Assignment.findById(req.params.assignmentId)
  .then(assignment => {
    assignment.name = assignment.name;
    assignment.description = assignment.description;
    assignment.due = assignment.due;
    assignment.status = assignment.status;
    assignment.course = assignment.course;

    assignment.submissions.push(req.params.userId);
    assignment
    .save()
    .then(() => res.json("User submitted " + assignment.name))
    .catch(err => res.status(400).json("Error => " + err));
  })
  .catch(err => res.status(400).json("Error => " + err));
};

exports.removeSubmission = function(req,res) {
  Assignment.findById(req.params.assignmentId)
  .then(assignment => {
    assignment.name = assignment.name;
    assignment.description = assignment.description;
    assignment.due = assignment.due;
    assignment.status = assignment.status;
    assignment.course = assignment.course;

    assignment.submissions.pull(req.params.userId);
    assignment
    .save()
    .then(() => res.json("User submission removed " + assignment.name))
    .catch(err => res.status(400).json("Error => " + err));
  })
  .catch(err => res.status(400).json("Error => " + err));
};
