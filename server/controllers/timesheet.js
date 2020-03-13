const model = require("../models");
const moment = require('moment');

class Timesheet {
  constructor() {}

  async create(req, res) {
    const timesheetToSave = req.body;

    //Creating a new timesheet
    const timesheetFromDatabase = await model.timesheet.save(timesheetToSave);
    // console.log(updatedTimesheetObjId, 'updatedTimesheetObjId');
    console.log(timesheetFromDatabase.timesheet, '_id of timesheet');

    //Adding timesheets of employees to projectManager and to employee
    if (timesheetFromDatabase.typeOfOperation === "create") {
      await Promise.all(
        timesheetToSave["week"].map(async week => {
          if (week.projectId) {
            const projectManager = (
              await model.project.get(
                { _id: week.projectId },
                { projectManager: 1 }
              )
            ).projectManager;

            console.log(week.projectId, projectManager, "Here man!");
            await model.projectManager.update(
              { managerId: projectManager },
              { $push: { timesheetIds: timesheetFromDatabase.timesheet._id } }
            );
            await model.employee.update(
              { _id: timesheetToSave.empObjId },
              { $push: { timesheet: timesheetFromDatabase.timesheet._id } }
            );
          }
        })
      );
    }

    res.send({
      success: true,
      payload: {
        data: timesheetToSave,
        message: timesheetFromDatabase.message
      }
    });
  }

  async show(req, res) {
    const empObjId = req.query.empObjId;
    var timesheet = [];
    
    if (empObjId) {
      timesheet = req.paginatedResults.results;
    } else {
      return res.status(400).send({
        success: false,
        payload: {
          message: "Employee doesn't exist"
        }
      });
    }

    if(req.query.type === 'week'){
      timesheet = timesheet.map((timesheetWeek) => {
        return { ...timesheetWeek.toObject(), week: undefined };
      });

      // !req.query.desc
      // ? timesheet.sort((first, second) => {
      //     if(moment(first.startDate) < moment(second.startDate)){
      //       return 1
      //     }
      //     if(moment(first.startDate) > moment(second.startDate)){
      //       return -1
      //     }
      //     return 0;
      //   })
      // : timesheet.sort((first, second) => {
      //       if(moment(first.startDate) < moment(second.startDate)){
      //       return -1
      //       }
      //       if(moment(first.startDate) > moment(second.startDate)){
      //       return 1
      //       }
      //       return 0;
      //   });
    }

    if (!timesheet) {
      return res.status(200).send({
        success: true,
        payload: {
          data: null,
          message: "No Timesheets for this account"
        }
      });
    } else {
      return res.status(200).send({
        success: true,
        payload: {
          data: {
            timesheet,
            result: req.paginatedResults
          },
          message: "Timesheets retrieved"
        }
      });
    }
  }

  async index(req, res) {
    const { empId, startDate } = req.query;
    console.log('Inside controllers/timesheet.js', empId, startDate);

    const filteredTimesheets = await model.timesheet.getTimesheetWeeks({ empObjId: empId, startDate: {
      $gte: startDate
    } });

    console.log(filteredTimesheets);

    return res.send({
      success: true,
      payload: {
        data: {
          filteredTimesheets
        },
        message: 'Timesheet for update retrieved successfully'
      }
    });
  }

  async searchTimesheets(req, res){
   
    console.log(req.query.date);
    let query=req.query.date;
    query = query.toLowerCase().trim()
    const timesheet = await model.project.getforsearch({ date: { $regex:`^${query}`, $options: 'i'}},{});
    console.log("==========>>>>>>>>>>>>>", timesheet);
    res.status(200).send(timesheet);
}

  async getTimesheetUsingRouteParams(req, res){
    const timesheetId = req.params.id;

    const timesheet = await model.timesheet.get({ _id: timesheetId });
    console.log(timesheet, 'timesheet', timesheetId, 'timesheetId');
    return res.send({
      success: true,
      payload: {
        data: {
          timesheet
        }
      }
    })
  }


  async update(req, res) {
    const col = { ...week };
    console.log(col);
    const timesheet = await model.timesheet.update(
      { _id: req.query.id },
      { $push: { week: col } }
    );
    res.send({
      success: true,
      payload: {
        timesheet
      }
    });
  }
  async modify(req, res) {
    console.log(req, "status change");
    const timesheet = await model.timesheet.update(
      { _id: req.body._id },
      { $set: { status: req.body.status } }
    );
    res.send({
      success: true,
      payload: {
        data: {
          timesheet
        }
      }
    });
  }

}

module.exports = new Timesheet();
