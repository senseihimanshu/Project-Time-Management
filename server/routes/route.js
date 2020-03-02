const controller = require('../controllers');

module.exports= (app) => {
	app.post("/project",controller.project.create);
	app.get("/projects",controller.project.index);
	app.get("/project/:id",controller.project.show);
	app.put("/project/:id",controller.project.update);
	app.delete("/project/:id",controller.project.delete);
	app.post("/employees",controller.employees.create) ;
	app.get("/employees",controller.employees.index) 
	app.get("/employees/:id",controller.employees.show) 
    app.put("/employees/:id",controller.employees.update) ;
	app.delete("/employees/:id",controller.employees.delete);
	app.post("/login", controller.login.checkUserAuthentication);
	app.get("./timesheet",controller.timesheet.index);
	app.post("./timesheet",controller.timesheet.create);
	app.post("/api/employee", controller.employees.create);
	app.put("/api/employee", controller.employees.update);
	app.get("/api/employee", controller.employees.show);
	app.delete("/api/employee", controller.employees.delete);
	//Timesheet Routes
	app.post('/api/timesheet', controller.timesheet.create)

}