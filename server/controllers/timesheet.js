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
    if (req.query.criteria.managerId) {
      let staffTimesheetIds = [];

      staffTimesheetIds = req.paginatedResults.results.map(
        staffTimesheetIds => staffTimesheetIds.staffTimesheetIds
      );

      staffTimesheetIds = [].concat.apply([], staffTimesheetIds);

      const staffTimesheets = await Promise.all(
        staffTimesheetIds.map(async timesheetId => {
          const timesheet = await model.timesheet.get({ _id: timesheetId });

          const employeeName = (
            await model.employee.get({ _id: timesheet.empObjId })
          ).name;
          const startDate = (await model.timesheet.get({ _id: timesheetId }))
            .startDate;
          const projectName = (
            await model.project.get({ _id: timesheet.projectObjId })
          ).projectName;
          const clientName = (
            await model.project.get({ _id: timesheet.projectObjId })
          ).clientName;

          return {
            ...timesheet.toObject(),
            week: undefined,
            employeeName,
            projectName,
            clientName,
            startDate
          };
        })
      );

      staffTimesheets.sort(
        (a, b) => +new Date(b.startDate) - +new Date(a.startDate)
      );

      req.paginatedResults.results = staffTimesheets;
      req.paginatedResults.dataSize = staffTimesheets.length;

      return res.send({
        success: true,
        payload: {
          data: {
            result: req.paginatedResults
          }
        }
      });
    }

    var timesheet = req.paginatedResults.results;

    timesheet = await Promise.all(
      timesheet.map(async timesheetWeek => {
        const employeeName = (
          await model.employee.get({ _id: timesheetWeek.empObjId })
        ).name;

        const projectName = (
          await model.project.get({ _id: timesheetWeek.projectObjId })
        ).projectName;

        return {
          ...timesheetWeek.toObject(),
          week: undefined,
          employeeName,
          projectName
        };
      })
    );

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

    const { projectObjId, empObjId } = await model.timesheet.get({
      _id: timesheetId
    });
    const { projectManager } = await model.project.get({ _id: projectObjId });

    if (
      req.employee._id == empObjId ||
      req.employee._id == projectManager ||
      req.employee.role === "admin"
    ) {
      let timesheet = await model.timesheet.get({ _id: timesheetId });

      const employeeName = (
        await model.employee.get({ _id: timesheet.empObjId })
      ).name;
      const projectName = (
        await model.project.get({ _id: timesheet.projectObjId })
      ).projectName;

      timesheet = { ...timesheet.toObject(), employeeName, projectName };

      return res.send({
        success: true,
        payload: {
          data: {
            timesheet
          }
        }
      });
    }

    return res.send({
      success: false,
      payload: {
        message: "You are not authorized to view this timesheet"
      }
    });
  }

  async getTimesheetUsingStartDate(req, res) {
    const startDate = req.query.startDate;
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

  async retrieveTimesheetsOfStaff(req, res) {
    let staffTimesheetIds = [];

    staffTimesheetIds = req.paginatedResults.results.map(
      staffTimesheetIds => staffTimesheetIds.staffTimesheetIds
    );

    staffTimesheetIds = [].concat.apply([], staffTimesheetIds);

    const staffTimesheets = await Promise.all(
      staffTimesheetIds.map(async timesheetId => {
        const timesheet = await model.timesheet.get({ _id: timesheetId });

        const employeeName = (
          await model.employee.get({ _id: timesheet.empObjId })
        ).name;
        const startDate = (await model.timesheet.get({ _id: timesheetId }))
          .startDate;
        const projectName = (
          await model.project.get({ _id: timesheet.projectObjId })
        ).projectName;
        const clientName = (
          await model.project.get({ _id: timesheet.projectObjId })
        ).clientName;

        return {
          ...timesheet.toObject(),
          week: undefined,
          employeeName,
          projectName,
          clientName,
          startDate
        };
      })
    );

    staffTimesheets.sort(
      (a, b) => +new Date(b.startDate) - +new Date(a.startDate)
    );

    req.paginatedResults.results = staffTimesheets;
    req.paginatedResults.dataSize = staffTimesheets.length;

    return res.send({
      success: true,
      payload: {
        data: {
          result: req.paginatedResults
        }
      }
    });
  }

  async updateStatus(req, res) {
    const timesheetId = req.params.id;

    const { projectObjId, empObjId } = await model.timesheet.get({
      _id: timesheetId
    });
    const { projectManager } = await model.project.get({ _id: projectObjId });

    const status = Boolean(req.body.status);

    if (req.employee._id == projectManager) {
      try {
        if (status) {
          await model.timesheet.update(
            { _id: timesheetId },
            { status: "approved" }
          );
        } else {
          await model.timesheet.update(
            { _id: timesheetId },
            { status: "declined" }
          );
        }

        res.send({
          success: true,
          payload: {
            message: timesheetId + ": status of Timesheet Updated Successfully"
          }
        });
      } catch (error) {
        res.send({
          success: false,
          payload: {
            message: error.message
          }
        });
      }
    } else {
      res.status(403).send({
        success: false,
        payload: {
          message: "You have no right to update the status"
        }
      });
    }
  }
}

module.exports = new Timesheet();
