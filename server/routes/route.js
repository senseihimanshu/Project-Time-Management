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

	//Project Manager
	app.get('/api/projectmanager/project/:staffid', authenticator, controller.projectManager.getProjects);


	// Timesheet
	app.post('/api/timesheet', authenticator, controller.timesheet.create);
	app.get('/api/timesheet/selectedweek', authenticator, controller.timesheet.getTimesheetUsingStartDate);
	app.get('/api/timesheet', [authenticator, paginator(model.timesheet.model)], controller.timesheet.index);
	app.get('/api/timesheet/:id', controller.timesheet.getTimesheetUsingRouteParams);


	//Project
	// app.post("/api/project", controller.project.create);
	// app.get("/projects", projectPaginator(model.project.model), controller.project.index);
	// app.get("/project", controller.project.show);
	// app.get("/projects/search", controller.project.searchProject);
	// app.put("/project/:id", controller.project.update);
	// app.put("/api/project", controller.project.update);
	// app.delete("/api/project", controller.project.delete);
	// //Employees
	// app.post("/employees", controller.employees.create) ;
    // app.put("/employees/:id", controller.employees.update) ;
	// app.delete("/employees/:id", controller.employees.delete);
	// app.get("/employees/search", controller.employees.searchEmployee);
	// 
	// app.post("/login", controller.login.checkUserAuthentication);
	// app.get("/timesheet", paginator(model.timesheet.model), controller.timesheet.show);
	// app.get("timesheets/search", controller.timesheet.searchTimesheets);
	// // app.post("./timesheet", controller.timesheet.create);
	// app.post("/api/employee", controller.employees.create);
	// app.put("/api/employee", controller.employees.update);
	// app.get("/api/employee", controller.employees.show);
	// app.delete("/api/employee", controller.employees.delete);
	// //Timesheet Routes
	// app.post('/api/timesheet', controller.timesheet.create);
	// app.patch("/api/timesheet", controller.timesheet.update);
	// app.get('/api/projectmanager', controller.projectManager.get);
	// //review
	// // app.put("/review",controller.review.update);
	// app.put("/review", controller.timesheet.modify);
	// app.get("/project/graphicaldata", controller.cleveldata.projectsStatusData);
	// app.get("/timesheet/graphicaldata", controller.cleveldata.timesheetsStatusData);
	// app.get('/project/projectList', controller.project.indexP);
	// app.get('/api/timesheet/filter', controller.timesheet.index);
	// app.get('/employeeList', controller.employees.indexP);
	// app.get('/api/timesheet/filter', controller.timesheet.index);
}