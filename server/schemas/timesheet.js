mongoose = require("mongoose");
ObjectId = mongoose.Schema.Types.ObjectId;
employee = require("./employee");
project = require("./project");

module.exports = {
  empObjId: {
    type: ObjectId,
    ref: "employee"
  },
  startDate: {
    type: Date
  },
  endDate: {
    type: Date
  },
  status: {
    type: String,
    enum: ['approved', 'declined', 'pending'],
    default: 'submit'
  },
  week: [
    {
      projectObjId: {
        type: ObjectId,
        ref: "project"
      },
      date: { type: Date },
      hours: { type: Number },
      taskType: {
        type: String,
        enum: ["offshore", "onsite", "earned-leave", "sick-leave", "casual-leave"],
      },
      status: {
        type: String,
        default: "pending",
        enum: ["approved", "declined", "pending"]
      },
      billable: {
        type: Boolean
      }
    }
  ]
};
