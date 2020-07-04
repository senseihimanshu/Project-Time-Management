const mongoose = require("mongoose");
const project = require("./project");
var ObjectId = mongoose.Schema.Types.ObjectId;
module.exports = {
  empId: {
    type: String,
    required: true,
    unique: true,
    minlength: 1,
    maxlength: 20
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 50
  },
  password: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 1024
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30
  },
  designation: {
    type: String,
    enum: ["associate", "consultant-2", "consultant-1", "intern"]
  },
  joining: {
    type: Date,
    default: Date.now()
  },
  phone: {
    type: String,
    minlength: 8,
    maxlength: 20
  },
  address: {
    type: String,
    minlength: 10,
    maxlength: 100
  },
  role: {
    type: String,
    default: "employee",
    enum: ["project-manager", "c-level", "employee", "admin"]
  }
};