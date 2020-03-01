const models = require('../models');

class Timesheet{
    async create(req, res){
        console.log(req.body, 'Inside Timesheet Controller');

        const { empObjectId, projectObjectId, taskType, billable, companyName, startDate, endDate, noOfHours, description } = req.body;

        if(!empObjectId && !projectObjectId && !taskType && !companyName && !startDate && !endDate && !noOfHours){
            return res.status(400).send({
                success: false,
                payload: {
                    message: 'Wrong Inputs'
                }
            });
        }

        const newTimesheet = {
            empObjectId, projectObjectId, taskType, billable, companyName, startDate, endDate, noOfHours, description
        }

        await models.timesheet.save(newTimesheet);

        res.send({
            success: true,
            payload: {
                message: 'Saved Timesheet Successfully'
            }
        });
    }
    async index(req, res) {
        const timesheetList = await model.timesheet.log({},{"empId":1,
                                                               "pId":1,
                                                                "startDate":1,"endDate":1, "taskType":1,"billable":1,"customerName":1,"companyName":1,"workingHours":1,"status":1,"totalHoursWeek":1});
        res.send(timesheetList);
      }
    
      async show(req, res) {
        const timesheetList = await model.timesheet.get({ empId: req.params.id },{"empId":1,
        "pId":1,"startDate":1,"endDate":1, "taskType":1,"billable":1,"customerName":1,"companyName":1,"workingHours":1,"status":1,"totalHoursWeek":1});
        res.send(timesheetList);
      }
      async show(req, res) {
        const timesheetList = await model.timesheet.get({ empId: req.params.id },{"empId":1,
        "pId":1,"startDate":1,"endDate":1, "taskType":1,"billable":1,"customerName":1,"companyName":1,"workingHours":1,"status":1,"totalHoursWeek":1});
        res.send(timesheetList);
      }
      
    
}

module.exports = new Timesheet();
