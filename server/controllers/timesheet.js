const model = require("../models");

class Timesheet {
  constructor() {}

  async create(req, res) {
    const timesheetToSave = req.body;

    console.log(req.body);

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
              { _id: projectManager },
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
    console.log("Reached Here @timesheet.js/line26");

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
    console.log(req.query);
    var timesheet = [];
    if (empObjId) {
      timesheet = await model.timesheet.get({ empObjId });
    } else {
      return res.status(400).send({
        success: false,
        payload: {
          message: "Employee doesn't exist"
        }
      });
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
            timesheet
          },
          message: "Timesheets retrieved"
        }
      });
    }
  }

  async index(req, res) {
    const timesheetList = await model.timesheet.get();
    console.log(timesheetList, "all timesheet");
    res.send(timesheetList);
  }
  async update(req, res) {
    const col = { ...req.body.week };
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
