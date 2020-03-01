const model = require("../models");
const schema = require("../schemas")
class Timesheet {
    constructor() {
      
    }
    async create(req, res) {
        let timesheetObj = {
            empId:req.body.empId,
            pId:req.body.pId,
            customerName:req.body.customerName,
            taskType:req.body.taskType,
            startDate:req.body.startDate,
            endDate:req.body.endDate,
            billable:req.body.billable,
            companyName:req.body.companyName,
            workingHours:{
                date:req.body.date,
                days:req.body.days,
                hours:req.body.hours
            },
            status:req.body.status,
            totalHoursWeek:req.body.totalHoursWeek
         };
        const employee = await model.timesheet.save(timesheetObj);
        res.send(employee);
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
    