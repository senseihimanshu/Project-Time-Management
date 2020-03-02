const model = require("../models");

class Project {
  constructor() {
    console.log("controllers me hu project wale");
  }

  async create(req, res) {
    try {
      let projectObj = {
        projectId: req.body.projectId,
        projectName: req.body.projectName,
        projectManager: req.body.projectMananger,
        clientName: req.body.clientName,
        status: req.body.status,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        empObjectIdArray: req.body.empIdArray,
        status: req.body.status
      };
      console.log(projectObj, "before save");
      const empObjectIdArray = [];
      const projectObjectIdArray = [];
      const empObjectIdPromise = async () => {
        await Promise.all(
          projectObj.empObjectIdArray.map(async empId => {
            const { _id, projectId } = await model.employee.get(
              { empId },
              { projectId }
            );

            const newProject = await model.project.save(projectObj);
            console.log(newProject);
            
            projectObjectIdArray.push(newProject);

            const projectId = await model.project.get({ projectId: projectObj.projectId })._id;

            await model.employee.updateOne(
              { empId },
              { projectId: [...projects, projectId] }
            );
            empObjectIdArray.push(projectId);
          })
        );
      };

      await empObjectIdPromise();

      const project = await model.project.save({
        ...projectObj,
        empObjectIdArray
      });
      console.log("running", project);
      return res.status("200").send(project);
      //here is a problem
    } catch (error) {
      console.log(error);
    }
  }

  async index(req, res) {
    const projectList = await model.project.log({});
    res.send(projectList);
  }

  async show(req, res) {
    const projectList = await model.project.get({ _id: req.params.id });
    res.send(projectList);
  }
  async update(req, res) {
    const project = await model.project.update(
      { _id: req.params.id },
      { $set: { projectName: req.body.projectName } }
    );
    res.send(project);
  }

  async delete(req, res) {
    console.log("running");
    const project = await model.project.delete({ _id: req.params.id });
    res.send(project);
  }
}
module.exports = new Project();
