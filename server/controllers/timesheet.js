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
      async update(req, res) {
        const {
          empId,
          status
        } = req.body;
    
        const timesheetToUpdate = await model.timesheet.get({ empId });
        console.log(empId);
        const patchedEmployee = {
          // email: email || employeeToUpdate.email,
          // name: name || employeeToUpdate.name,
          // designation: designation || employeeToUpdate.designation,
          // joining: joining || employeeToUpdate.joining,
          // phone: phone || employeeToUpdate.phone,
          // address: address || employeeToUpdate.address, 
          // password: password || employeeToUpdate.password,
          status:status || timesheetToUpdate.status
        };
    
        console.log(patchedEmployee);
        // const newEmployee = new Employee(patchedEmployee);
    
        try {
          await model.employee.update(patchedEmployee).then(() => {
            res.status(200).send({
              success: true,
              payload: {
                message: "Status updated successfully"
              }
            });
          });
        } catch (err) {
          res.status(400).send({
            success: false,
            payload: {
              message: err.message
            }
          });
        }
      }
    
 
    
}

module.exports = new Timesheet();
