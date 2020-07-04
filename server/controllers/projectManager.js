const model = require("../models");

class ProjectManager {
  async getProjects(req, res) {
    const staffId = req.params.staffid;
    try {
      const projectObjIds = await model.projectManager.log(
        { staffId },
        { projectObjId: 1 }
      );


      let projects = [];
      projects = await Promise.all(
        projectObjIds.map(async projectObjId => {
          return (await model.project.get(
            { _id: projectObjId.projectObjId },
            {
              projectId: 1,
              projectManager: 1,
              projectName: 1,
              clientName: 1
            }
          ));
        })
      );

      return res.send({
        success: true,
        payload: {
          data: {
            projects
          },
          message: "Projects of Staff Id retrieved successfully"
        }
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        payload: {
          message: error
        }
      });
    }
  }
}

module.exports = new ProjectManager();
