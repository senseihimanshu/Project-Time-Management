const model = require("../models");
const schema = require("../schemas");
class Project {
  constructor() {
    
  }

  async create(req, res) {
    
   

    let projectObj = {
      projectId: req.body.projectId,
      projectName: req.body.projectName,
      projectManager: req.body.managers,
      clientName: req.body.client_name,
      status: req.body.status,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      empObjectIdArray: req.body.members,
      status: req.body.status
    };
    // const empObjArr = [empObj._id];
    // projectObj.empObjectIdArray = empObjArr;
    // projectObj.projectManager = projectManagerIdObj._id;

    console.log(projectObj, "Abha Rana");

    if (await model.project.get({ projectId: projectObj.projectId }))
      return res.status(400).send({
        success: false,
        payload: {
          message: "Project Id already exists"
        }
      });
    const empObjectIdArray = [];

    const generateProjectPromise = async () => {
      await Promise.all(
        projectObj.empObjectIdArray.map(async empId => {
          const { _id } = await model.employee.get({}, { empId });
          console.log(_id);
          console.log(_id, "Before Push in empObjectIdArray");
          empObjectIdArray.push(_id);
        })
      );

      const newProject = await model.project.save({
        ...projectObj,
        empObjectIdArray
      });
      console.log(newProject);

      return newProject;
    };

    console.log(empObjectIdArray);

    const newProjectId = (await generateProjectPromise())._id;
    console.log(newProjectId, "id mili");
    const employeesUpdatePromise = async () => {
      await Promise.all(
        empObjectIdArray.map(async empObjectId => {
          await model.employee.update(
            { _id: empObjectId },
            { $push: { projectId: newProjectId } }
          );
        })
      );
    };

    await employeesUpdatePromise();

    const projectManagerId = (
      await model.employee.get({ _id: projectObj.projectManager })
    )._id;
    model.projectManager.save({
      managerId: projectManagerId,
      employeeId: empObjectIdArray,
      projectId: newProjectId
    });

    res.status(201).send({
      success: true,
      payload: {
        message: "Project created successfully"
      }
    });
  }

  async index(req, res) {
  const projectList = await model.project.log({});
    console.log("in index function");
    console.log(projectList, 'ProjectList -----------------------------------');
    const tempList = [];
   await Promise.all(
    projectList.map(async(project) => {
        const manager = await model.employee.get(
          { _id: project.projectManager },
          { name: 1, _id: 0 }
        );
        const member = await model.employee.get(
          { _id: project.empObjectIdArray },
          { name: 1, _id: 0 }
        );
       console.log(member.name, 'member.name', manager);
      tempList.push({ project:project, projectManagerName: manager && manager.name ,memberName:member && member.name});
      })
    );  
    
    
    console.log(tempList,'templist===========');

    res.send({
      tempList
    });
  }

  async show(req, res) {
    const projectList =await model.project.get({ _id: req.query.projectId });
   
    res.send(projectList);
  }
  async update(req, res) {
    //Expecting that req.body will have required details with same keys!!! (Just to save time)
    const project = await model.project.update(
      { _id: req.query.id },
      { $set: { ...req.body } }
    );
    res.send({
      success: true,
      payload: {
        data: project,
        messsage:"project updated successfully"
      }
    });
  }

  async delete(req, res) {
    console.log("running");
    console.log(req.query.id);
    const project = await model.project.delete({ _id: req.query.id });
    console.log(project, "proj");
    res.send({
      success: true,
      payload: {
        employee,
        message: "Project Deleted Successfully"
      }
    });
  }
}

module.exports = new Project();
