const mongoose = require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId;

module.exports = {
  projectId: {
    type: String,
    required: true,
    unique: true
  },
  projectName: {
    type: String,
    required: true,
    unique: true
  },
  projectManager: {
    type: ObjectId,
    ref: "projectmanager",
    required: true
  },
  clientName: {
    type: String,
    required: true
  },
  startDate: {
    type: String,
    default: Date.now()
  },
  endDate: {
    type: String,
    default: null
  },
  status: {
    type: String,
    enum: ["completed", "discarded", "in-progress"],
    default: "in-progress"
  }
};
