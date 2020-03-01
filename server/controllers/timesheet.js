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
}

module.exports = new Timesheet();