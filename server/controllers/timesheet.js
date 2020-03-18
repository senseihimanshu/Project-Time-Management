const model = require("../models");
const moment = require("moment");

class Timesheet {
  constructor() {}

  async create(req, res) {
    //Expecting correct data type and values
    const timesheetToSave = req.body;
    timesheetToSave.empObjId = req.employee._id;

    //Creating a new timesheet
    const timesheetFromDatabase = await model.timesheet.save(timesheetToSave);
    const timesheetObjId =
      timesheetFromDatabase.timesheet && timesheetFromDatabase.timesheet._id;

    console.log(timesheetObjId);

    //Adding timesheets of employees to projectManager
    if (timesheetFromDatabase.typeOfOperation === "create") {
      model.projectManager.update(
        {
          projectObjId: timesheetToSave.projectObjId,
          staffId: timesheetToSave.empObjId
        },
        { $push: { staffTimesheetIds: timesheetObjId } }
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

  async index(req, res) {
    var timesheet = req.paginatedResults.results;
    //console.log(timesheet);

    timesheet = await Promise.all(timesheet.map(async timesheetWeek => {
      const employeeName = (await model.employee.get({ _id: timesheetWeek.empObjId })).name;
      const projectName = (await model.project.get({ _id: timesheetWeek.projectObjId })).projectName;

      return { ...timesheetWeek.toObject(), week: undefined, employeeName, projectName };
    }));
    
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
            result: timesheet
          },
          message: "Timesheets retrieved"
        }
      });
    }
  }

  async show(req, res) {
    const { empId, startDate } = req.query;

    const filteredTimesheets = await model.timesheet.getTimesheetWeeks({
      empObjId: empId,
      startDate: {
        $gte: startDate
      }
    });

    return res.send({
      success: true,
      payload: {
        data: {
          filteredTimesheets
        },
        message: "Timesheet for update retrieved successfully"
      }
    });
  }

  async searchTimesheets(req, res) {
    let query = req.query.date;
    query = query.toLowerCase().trim();
    const timesheet = await model.project.getforsearch(
      { date: { $regex: `^${query}`, $options: "i" } },
      {}
    );
    res.status(200).send(timesheet);
  }

  async getTimesheetUsingRouteParams(req, res) {
    const timesheetId = req.params.id;

    let timesheet = await model.timesheet.get({ _id: timesheetId });

    const employeeName = (await model.employee.get({ _id: timesheet.empObjId })).name;
    const projectName = (await model.project.get({ _id: timesheet.projectObjId })).projectName;

    timesheet = { ...timesheet.toObject(), employeeName, projectName }

    return res.send({
      success: true,
      payload: {
        data: {
          timesheet
        }
      }
    });
  }

  async getTimesheetUsingStartDate(req, res) {
    const startDate = req.query.startDate;
    console.log(startDate, 'Start Date');
    const timesheet = await model.timesheet.get({
      startDate,
      empObjId: req.employee._id
    });

    return res.send({
      success: true,
      payload: {
        data: {
          timesheet
        }
      }
    });
  }

  async update(req, res) {
    const col = { ...week };
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
