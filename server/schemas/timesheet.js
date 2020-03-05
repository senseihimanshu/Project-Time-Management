mongoose = require("mongoose");
ObjectId = mongoose.Schema.Types.ObjectId;
employee = require("./employee");
project = require("./project-details");

module.exports = {
  empObjId: {
    type: ObjectId,
    ref: "employee",
    unique: true
  },

  startDate: {
    type: Date
  },
  endDate: {
    type: Date
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
      projectId: {
        type: ObjectId,
        ref: "project"
      },
      date: { type: Date, required: true },
      hours: { type: Number, required: true },
      taskType: {
        type: String,
        enum: ["Offshore", "Onsite"]
      },
      leaveType: {
        type: String,
        enum: ["Holiday", "Earned leave", "Casual leave", "Sick leave", "none"]
      }
    }
  ],
  hoursPerWeek: {
    type: Number
  },
  status: {
    type: String,
    default: "Pending",
    enum: ["Approved", "Declined", "Pending"]
  },
  customerName: {
    type: String,
    default: null
  }
};
