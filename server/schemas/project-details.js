const mongoose = require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId;
const employee = require("./employee");
module.exports = {
  projectName: {
    type: String,
    required: true
  },
  projectManager: {
    type: String,
    required: true
  },
  clientName: {
    type: String,
    required: true
  },
  startDate: {
    type: String,
    default: null
  },
  endDate: {
    type: String,
    default: null
  },
  empObjectIdArray: [{ type: ObjectId, ref: "employee" }],
  status: {
    type: String,
    enum: ["completed", "discarded", "in-progress"],
    default: 'in-progress'
  }
};
