const mongoose = require("mongoose"); // require mongoose

const Schema = mongoose.Schema;

const assignmentSchema = new Schema( // creating new schema
  {
    // Properties with validations
    name: { type: String, trim: true, minlength: 3, required: true },
    status: { type: Boolean, required: true, default: true },
    description: { type: String, trim: true, required: true },
    due: { type: Date, required: true, default: false },
    course: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: "true"
    }
    // instruction_file: {                          //To be added later
    //     type: Schema.Types.ObjectId,
    //     ref: "File"
    // },
    // submissions:{                                //To be added later
    //     type: Schema.Types.ObjectId,
    //     ref: "Submission"
    // }
  },
  {
    timestamps: true // automatically manages timestamp, when created the record
  }
);

const Assignment = mongoose.model("Assignment", assignmentSchema); // attaching model name with schema

module.exports = Assignment; // exporting model
