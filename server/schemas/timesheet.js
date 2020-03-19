mongoose = require("mongoose");
ObjectId = mongoose.Schema.Types.ObjectId;
employee = require("./employee");
project = require("./project");

module.exports = {
  empObjId: {
    type: ObjectId,
    ref: "employee"
  },
  projectObjId: {
    type: ObjectId,
    ref: "project"
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
    default: 'pending'
  },
  week: [
    {
      date: { type: Date },
      hours: { type: Number },
      taskType: {
        type: String,
        enum: ["offshore", "onsite", "earned-leave", "sick-leave", "casual-leave", null]
      },
      billable: {
        type: Boolean
      }
    }
  ]
};
