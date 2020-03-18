const employeeDb=require('./employee');
const  projectDb=require('./project');
const timesheetDb=require('./timesheet');
const projectManagerDb = require('./projectmanager');
const review=require('./review')

module.exports={
    employee: employeeDb,
    project: projectDb,
    timesheet:timesheetDb,
    projectManager: projectManagerDb
}