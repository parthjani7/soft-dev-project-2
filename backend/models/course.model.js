const mongoose = require("mongoose"); // require mongoose

const Schema = mongoose.Schema;

const courseSchema = new Schema( // creating new schema
  {
    // Properties with validations
    coursename: { type: String, trim: true, minlength: 3, required: true },
    coursestatus: { type: Boolean, required: true, default: true },
    teacherid: { type: Number, trim: true, minlength: 3, required: true } //reference id of the users in User table
  },
  {
    timestamps: true // automatically manages timestamp, when created the record
  }
);

const Course = mongoose.model("Course", courseSchema); // attaching model name with schema

module.exports = Course; // exporting model
