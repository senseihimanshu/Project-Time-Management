const model = require("../models");
const schema = require("../schemas");
class Project {
  constructor() {}

  async create(req, res) {
    let projectObj = {
      projectId: req.body.projectId,
      projectName: req.body.projectName && req.body.projectName.toLowerCase(),
      projectManager: req.body.manager,
      clientName: req.body.clientName,
      status: req.body.status,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      empObjectIdArray: req.body.members,
      status: req.body.status
    };

    if (+new Date(projectObj.startDate) > +new Date(projectObj.endDate)) {
      return res.status(400).send({
        success: false,
        payload: {
          message: "Start Date must be less than End Date"
        }
      });
    }

    if (await model.project.get({ projectId: projectObj.projectId }))
      return res.status(400).send({
        success: false,
        payload: {
          message: "Project Id already exists"
        }
      });

    try {
      const newProjectId = (
        await model.project.save({
          ...projectObj
        })
      )._id;

      if (projectObj.empObjectIdArray) {
        await Promise.all(
          projectObj.empObjectIdArray.map(async staff => {
            await model.projectManager.save({
              managerId: projectObj.projectManager,
              staffId: staff,
              projectObjId: newProjectId
            });
          })
        );
      }

      return res.status(201).send({
        success: true,
        payload: {
          message: "Project created successfully"
        }
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        payload: {
          message: error.message
        }
      });
    }
  }

  async index(req, res) {
    const projectList = req.paginatedResults.results;

    await Promise.all(
      projectList.map(async (project, index) => {
        const manager = await model.employee.get(
          { _id: project.projectManager },
          { name: 1, _id: 0 }
        );

        const managerName = manager && manager.name;

        const projectManagerStaffObjs = await model.projectManager.log(
          { managerId: project.projectManager, projectObjId: project._id },
          { staffId: 1, _id: 0 }
        );

        const staffIds = projectManagerStaffObjs.map(employeeId => {
          return employeeId.staffId;
        });

        const memberNames = await Promise.all(
          staffIds.map(async employee => {
            const employeeObj = await model.employee.get(
              { _id: employee },
              { name: 1, _id: 0 }
            );
            if (employeeObj) {
              return employeeObj.name;
            }
          })
        );

        projectList[index] = {
          ...project.toObject(),
          managerName,
          memberNames: memberNames
        };
      })
    );

    req.paginatedResults.results = projectList;

    return res.status(200).send({
      success: true,
      payload: {
        data: {
          result: req.paginatedResults
        },
        message: "Projects Retrieved"
      }
    });
  }

  async show(req, res) {
    const project = await model.project.get({ projectId: req.params.id });

    const projectManagerStaffObjs = await model.projectManager.log(
      { projectObjId: project._id },
      { staffId: 1, _id: 0 }
    );

    const staffIds = projectManagerStaffObjs.map(employeeId => {
      return employeeId.staffId;
    });

    const projectDetails = { ...project.toObject(), memberIds: staffIds };

    res.send({
      success: true,
      payload: {
        data: {
          projectDetails
        },
        message: "Project Data Retrieved Successfully"
      }
    });
  }

  async update(req, res) {
    const projectId = req.params.id;

    try {
      let projectToBeUpdatedObj = {
        projectName: req.body.projectName && req.body.projectName.toLowerCase(),
        projectManager: req.body.manager,
        clientName: req.body.clientName,
        status: req.body.status,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        empObjectIdArray: req.body.members,
        status: req.body.status
      };

      if (
        +new Date(projectToBeUpdatedObj.startDate) >
        +new Date(projectToBeUpdatedObj.endDate)
      ) {
        return res.status(400).send({
          success: false,
          payload: {
            message: "Start Date must be less than End Date"
          }
        });
      }
      const projectObjId = (await model.project.get({ projectId }))._id;

      await model.project.update({ projectId }, projectToBeUpdatedObj);

      const projectManagerDocumentArray = await model.projectManager.log(
        { projectObjId },
        { staffId: 1, managerId: 1 }
      );
      const staffIdsStoredStringArray = projectManagerDocumentArray.map(
        document => document.staffId.toString()
      );

      if (
        projectManagerDocumentArray[0] &&
        projectManagerDocumentArray[0].managerId !==
          projectToBeUpdatedObj.projectManager
      )
        await model.projectManager.updateMany(
          {
            projectObjId
          },
          { managerId: projectToBeUpdatedObj.projectManager }
        );

      if (projectToBeUpdatedObj.empObjectIdArray.length === 0) {
        await model.projectManager.deleteMany({
          projectObjId
        });
      } else {
        await Promise.all(
          projectToBeUpdatedObj.empObjectIdArray.map(async employee => {
            !staffIdsStoredStringArray.includes(employee) &&
              (await model.projectManager.save({
                projectObjId,
                managerId: projectToBeUpdatedObj.projectManager,
                staffId: employee
              }));
          })
        );

        await Promise.all(
          staffIdsStoredStringArray.map(async employee => {
            !projectToBeUpdatedObj.empObjectIdArray.includes(employee) &&
              (await model.projectManager.delete({
                projectObjId,
                staffId: employee
              }));
          })
        );
      }
      res.send({
        success: true,
        payload: {
          message: "Project Updated Successfully"
        }
      });
    } catch (error) {
      res.status(400).send({
        success: false,
        payload: {
          message: error.message
        }
      });
    }
  }

  async delete(req, res) {
    const projectObjId = (
      await model.project.get({ projectId: req.params.id }, { _id: 1 })
    )._id;

    await model.project.delete({ _id: projectObjId });
    await model.projectManager.model.deleteMany({ projectObjId });
    await model.timesheet.deleteMany({ projectObjId });

    res.send({
      success: true,
      payload: {
        message: "Project Deleted Successfully"
      }
    });
  }
}
module.exports = new Project();