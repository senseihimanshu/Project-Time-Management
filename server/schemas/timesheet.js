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
  
  week: [
    {
      projectId: {
        type: ObjectId,
        ref: "project"
      },
      date: { type: Date, required: true },
      hours: { type: Number },
      taskType: {
        type: String,
        enum: ["offshore", "onsite", "earned-leave", "sick-leave", "casual-leave", null]
      },
      status: {
        type: String,
        default: "pending",
        enum: ["approved", "declined", "pending"]
      },
      billable: {
        type: Boolean
      },
      clientName: {
        type: String,
        default: null
      }
    }
  ]
};
