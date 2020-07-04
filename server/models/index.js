const employeeModel = require("./employee");
const projectModel = require("./project");
const timesheetModel = require("./timesheet");
const projectManagerModel = require("./projectmanager");

module.exports = {
  employee: employeeModel,
  project: projectModel,
  timesheet: timesheetModel,
  projectManager: projectManagerModel
};
