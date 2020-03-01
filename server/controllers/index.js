const login=require('./loginController');
const employees = require('./employees');
const timesheet=require('./timesheet')

module.exports =
{    login : login,
    employees : employees,
    timesheet:timesheet
}