const mongoose = require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId;
const employee = require("./employee");
const project = require("./project-details");

module.exports = {
  empObjectId: {
    type: ObjectId,
    ref: "employee",
    required: true
  },
  projectObjectId: {
    type: ObjectId,
    ref: "project",
    required: true
  },
  taskType: {
    type: String,
    enum: ["offshore", "onsite", "earned-leave", "casual-leave", "sick-leave"]
  },
  billable: {
    type: Boolean,
    default: false
  },
  companyName: {
    type: String,
    default: null
  },
  startDate: {
      type: Date
  },
  endDate: {
    type: Date
  },
  noOfHours: {
    type: Number,
    min: 0,
    max: 40
  },
  description: {
      type: String,
      maxlength: 100
  },
  status: {
    type: String,
    default: 'pending',
    enum: ["approved", "declined", "pending"]
  }
};
