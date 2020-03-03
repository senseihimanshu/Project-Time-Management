const controller = require('../controllers');

module.exports= (app) => {
	//Project Routes
	app.post("/api/project",controller.project.create);
	app.get("/projects",controller.project.index);
	app.get("/project/:id",controller.project.show);
	app.put("/api/project",controller.project.update);
	app.delete("/project/:id",controller.project.delete);
	
	app.post("/login", controller.login.checkUserAuthentication);
	app.get("./timesheet",controller.timesheet.index);
	app.post("./timesheet",controller.timesheet.create);
	app.post("/api/employee", controller.employees.create);
	app.put("/api/employee", controller.employees.update);
	app.get("/api/employee", controller.employees.show);
	app.delete("/api/employee", controller.employees.delete);
	//Timesheet Routes
	app.post('/api/timesheet', controller.timesheet.create)
	app.put("/api/timesheet", controller.timesheet.update);
}