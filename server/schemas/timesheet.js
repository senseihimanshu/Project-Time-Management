const mongoose = require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId;
const employee = require("./employee");
const project = require("./project-details");

module.exports = {
  empObjId: {
    type: ObjectId,
    ref: "employee",
   // required: true
  },

  startDate: {
    type: Date,
    //required: true
  },
  endDate: {
    type: Date,
    //required: true
  },
  billable: {
    type: Boolean,
    //required: true
  },
  companyName: {
    type: String,
    default: "CyberGroup"
  },
  week: [
    {
      pId: {
        type: ObjectId,
        ref: "project",
        //required: true
      },
      date: { type: Date, required: true },
      hours: { type: Number, required: true },
      taskType: {
        type: String,
        enum: ["Offshore", "Onsite"]
      },
      leaveType: {
        type: String,
        enum: ["Holiday", "Earned leave", "Casual leave", "Sick leave","none"]
      }
    }
  ],
  hoursPerWeek: {
    type: Number
    //required:true
  },
  status: {
    type: String,
    default: "Pending",
    enum: ["Approved", "Declined", "Pending"],
   // required: true
  },
  customerName: {
    type: String,
    default: null
  }
};
