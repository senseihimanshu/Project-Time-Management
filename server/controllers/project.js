const model = require("../models");

class Project {
  constructor() {
    console.log("controllers me hu project wale");
  }

  async create(req, res) {
      console.log("hgdjshxjkashdkjas",req.body);
      let projectObj = {
        projectName: req.body.projectName,
        projectManager: req.body.projectManager,
        clientName: req.body.clientName,
        status: req.body.status,
        startDate:req.body.startDate,
        endDate:req.body.endDate,
       //empObjectIdArray=req.body.empObjectIdArray,
      }
      try {
        const project = await model.project.save(projectObj).then(() => {
          res.status(200).send({
            success: true,
            payload: {
              message: "Project created successfully"
            }
          });
        });
      } catch (err) {
        res.status(400).send({
          success: false,
          payload: {
            message: err.message
          }
        });
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
