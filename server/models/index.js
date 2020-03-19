const employeeDb = require("./employee");
const projectDb = require("./project");
const timesheetDb = require("./timesheet");
const projectManagerDb = require("./projectmanager");

module.exports = {
  employee: employeeDb,
  project: projectDb,
  timesheet: timesheetDb,
  projectManager: projectManagerDb
};
