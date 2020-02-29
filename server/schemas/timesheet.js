const mongoose = require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId;
const employee = require("./employee");
const project = require("./project-details");

module.exports = {
  empObjectId: {
    type: ObjectId,
    ref: "employee"
  },
  projectObjectId: {
    type: ObjectId,
    ref: "project",
    default: null
  },
  taskType: {
    type: String,
    enum: ["offshore", "onsite", "earned-leave", "casual-leave", "sick-leave"]
  },
  billable: {
    type: Boolean
  },
  companyName: {
    type: String
  },
  workingHours: {
    date: [{ type: Date }],
    days: [
      {
        type: String,
        enum: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ]
      }
    ],
    hours: [{ type: Number }]
  },
  status: {
    type: String,
    enum: ["Approved", "Declined", "Pending"],
    required: true
  },
  totalHoursWeek: {
    type: Number,
    default: null
  }
};
