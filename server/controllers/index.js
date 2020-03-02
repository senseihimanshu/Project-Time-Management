const login=require('./loginController');
const employees = require('./employees');
const timesheet = require('./timesheet');
const project=require('./project')
module.exports =
{    login : login,
    employees : employees,
    timesheet:timesheet,
    project:project
}