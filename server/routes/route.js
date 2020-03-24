const controller = require('../controllers');
const paginator = require('../middlewares/pagination');
const employeePaginator  = require('../middlewares/employee_pagination')
const authenticator = require('../middlewares/authentication');
const checkAdmin = require('../middlewares/isAdmin');
const model = require('../models');

module.exports = (app) => {
	//Login
	app.post('/api/login', controller.login);
	
	//Employee
	app.post('/api/employee', [authenticator, checkAdmin], controller.employee.create);
	app.get('/api/employee', [authenticator, checkAdmin, employeePaginator(model.employee.model,'employee')], controller.employee.index);
	app.get('/api/employee/:id', [authenticator], controller.employee.show);
	app.put('/api/employee/:id', [authenticator, checkAdmin], controller.employee.update);	
	app.delete('/api/employee/:id', [authenticator, checkAdmin], controller.employee.delete);	

	//Project
	app.get('/api/project', [authenticator, employeePaginator(model.project.model,'project')], controller.project.index);
	app.post('/api/project', authenticator, checkAdmin, controller.project.create);
	app.get('/api/project/:id', authenticator, checkAdmin, controller.project.show);
	app.put('/api/project/:id', authenticator, checkAdmin, controller.project.update);
	app.delete('/api/project/:id', authenticator, checkAdmin, controller.project.delete);

	//Project Manager
	app.get('/api/projectmanager/project/:staffid', authenticator, controller.projectManager.getProjects);

	// Timesheet
	app.post('/api/timesheet', authenticator, controller.timesheet.create);
	app.get('/api/timesheet/selectedweek', authenticator, controller.timesheet.getTimesheetUsingStartDate);
	app.get('/api/timesheet', [authenticator, paginator(model.timesheet.model)], controller.timesheet.index);
	app.get('/api/timesheet/staff', [authenticator, paginator(model.projectManager.model)], controller.timesheet.retrieveTimesheetsOfStaff);
	app.get('/api/timesheet/:id', authenticator, controller.timesheet.getTimesheetUsingRouteParams);
	app.patch('/api/timesheet/review/:id', authenticator, controller.timesheet.updateStatus);

	//Clevel graphs API
	app.get("/project/graphicaldata", authenticator,controller.cleveldata.projectsStatusData);
	app.get("/timesheet/graphicaldata", authenticator,controller.cleveldata.timesheetsStatusData);
}