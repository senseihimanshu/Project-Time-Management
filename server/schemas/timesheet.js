mongoose = require("mongoose");
ObjectId = mongoose.Schema.Types.ObjectId;
employee = require("./employee");
project = require("./project-details");

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
  state: {
    type: String,
    enum: [ 'approved', 'rejected', 'submit'],
    default: 'submit'
  },
  week: [
    {
      projectId: {
        type: ObjectId,
        ref: "project"
      },
      date: { type: Date },
      hours: { type: Number },
      taskType: {
        type: String,
        enum: ["offshore", "onsite", "earned-leave", "sick-leave", "casual-leave", null]
      },
      status: {
        type: String,
        default: "Pending",
        enum: ["Approved", "Declined", "Pending"]
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
