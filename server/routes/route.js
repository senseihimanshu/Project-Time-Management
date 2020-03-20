/*  const controller = require('../controllers');
const paginator = require('../middlewares/pagination');
const authenticator = require('../middlewares/authentication');
const model = require('../models');

module.exports = (app) => {
	//Login
	app.post('/api/login', controller.login);
	
	//Employee
	app.post('/api/employee', [authenticator], controller.employee.create);
	app.get('/api/employee', [authenticator, paginator(model.employee.model)], controller.employee.index);
	app.get('/api/employee/:id', authenticator, controller.employee.show);
	app.put('/api/employee/:id', authenticator, controller.employee.update);	
	app.delete('/api/employee/:id', authenticator, controller.employee.delete);	

	//Project
	app.get('/api/project', [authenticator, paginator(model.project.model)], controller.project.index);
	app.post('/api/project', authenticator, controller.project.create);
	app.get('/api/project/:id', authenticator, controller.project.show);
	app.put('/api/project/:id', authenticator, controller.project.update);
	app.delete('/api/project/:id', authenticator, controller.project.delete);

	//Review
	app.put('/api/review',controller.timesheet.modify);
	//Project Manager
	app.get('/api/projectmanager/project/:staffid', authenticator, controller.projectManager.getProjects);
	//clevel graphs API
	app.get("/project/graphicaldata",controller.cleveldata.projectsStatusData);
	app.get("/timesheet/graphicaldata",controller.cleveldata.timesheetsStatusData);
   // Timesheet
	app.post('/api/timesheet', authenticator, controller.timesheet.create);
	app.get('/api/timesheet/selectedweek', authenticator, controller.timesheet.getTimesheetUsingStartDate);
	app.get('/api/timesheet', [authenticator, paginator(model.timesheet.model)], controller.timesheet.index);
	app.get('/api/timesheet/:id', controller.timesheet.getTimesheetUsingRouteParams);
	app.get('/api/timesheet/review/:id', controller.timesheet.updateStatus);


	// Timesheet
	app.post('/api/timesheet',controller.timesheet.create);
	app.get('/api/timesheet/selectedweek', controller.timesheet.getTimesheetUsingStartDate);
	app.get('/api/timesheet', [authenticator, paginator(model.timesheet.model)], controller.timesheet.index);
	app.get('/api/timesheet/staff', [authenticator, paginator(model.projectManager.model)], controller.timesheet.retrieveTimesheetsOfStaff);
	app.get('/api/timesheet/:id', authenticator, controller.timesheet.getTimesheetUsingRouteParams);
	app.patch('/api/timesheet/review/:id', authenticator, controller.timesheet.updateStatus);
} */
const controller = require('../controllers');
const paginator = require('../middlewares/pagination');
const authenticator = require('../middlewares/authentication');
const model = require('../models');

module.exports = (app) => {
	//Login
	app.post('/api/login', controller.login);
	
	//Employee
	app.post('/api/employee', [authenticator], controller.employee.create);
	app.get('/api/employee', [authenticator, paginator(model.employee.model)], controller.employee.index);
	app.get('/api/employee/:id', authenticator, controller.employee.show);
	app.put('/api/employee/:id', authenticator, controller.employee.update);	
	app.delete('/api/employee/:id', authenticator, controller.employee.delete);	

	//Project
	app.get('/api/project', [authenticator, paginator(model.project.model)], controller.project.index);
	app.post('/api/project', authenticator, controller.project.create);
	app.get('/api/project/:id', authenticator, controller.project.show);
	app.put('/api/project/:id', authenticator, controller.project.update);
	app.delete('/api/project/:id', authenticator, controller.project.delete);

	//Review
    //app.put('/api/review',controller.timesheet.modify);
	//Project Manager
	app.get('/api/projectmanager/project/:staffid', authenticator, controller.projectManager.getProjects);
	//clevel graphs API
	app.get("/project/graphicaldata",authenticator,controller.cleveldata.projectsStatusData);
	 app.get("/timesheet/graphicaldata",authenticator,controller.cleveldata.timesheetsStatusData);
   // Timesheet
	app.post('/api/timesheet', authenticator, controller.timesheet.create);
	app.get('/api/timesheet/selectedweek', authenticator, controller.timesheet.getTimesheetUsingStartDate);
	app.get('/api/timesheet', [authenticator, paginator(model.timesheet.model)], controller.timesheet.index);
	app.get('/api/timesheet/:id', controller.timesheet.getTimesheetUsingRouteParams);
	app.get('/api/timesheet/review/:id', controller.timesheet.updateStatus);


	// Timesheet
	app.post('/api/timesheet',controller.timesheet.create);
	app.get('/api/timesheet/selectedweek', controller.timesheet.getTimesheetUsingStartDate);
	app.get('/api/timesheet', [authenticator, paginator(model.timesheet.model)], controller.timesheet.index);
	app.get('/api/timesheet/staff', [authenticator, paginator(model.projectManager.model)], controller.timesheet.retrieveTimesheetsOfStaff);
	app.get('/api/timesheet/:id', authenticator, controller.timesheet.getTimesheetUsingRouteParams);
	app.patch('/api/timesheet/review/:id', authenticator, controller.timesheet.updateStatus);
}