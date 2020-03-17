const login = require("./login");
const employees = require("./employees");
const timesheet = require("./timesheet");
const project = require("./project");
const projectManager = require("./projectManager");
const review=require("./review");
const cleveldata=require("./cleveldata");
module.exports = {
  login: login,
  employee: employees,
  timesheet: timesheet,
  project: project,
  projectManager: projectManager,
  review:review,
  cleveldata:cleveldata,
  
};
