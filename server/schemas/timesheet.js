const mongoose = require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId;
const employee = require("./employee");
const project = require("./project-details");

module.exports = {
  empObjId: {
    type: ObjectId,
    ref: "employee",
    default: null
  },
  pId: {
    type: ObjectId,
    ref: "project",
    default: null
  },
  startDate: {
    type: Date,
    default: null
  },
  endDate: {
    type: Date,
    default: Date.now()
  },
  taskType: {
    type: String,
    enum: ["Offshore", "Onsite", "Earned leave", "Casual leave", "Sick leave"]
  },
  billable: {
    type: Boolean
  },
  companyName: {
    type: String,
    default: "CyberGroup"
  },
  week: [
    {
      startDate: [{ type: Date }],
      endDate: [{ type: Date }],
      hours: [{ type: Number }]
    }
  ],
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
    default: "Pending",
    enum: ["Approved", "Declined", "Pending"],
    required: true
  },
  customerName: {
    type: String,
    default: null
  }
};
