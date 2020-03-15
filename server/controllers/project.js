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
      clientName: req.body.clientName,
      status: req.body.status,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      empObjectIdArray: req.body.members,
      status: req.body.status
    };
    // const empObjArr = [empObj._id];
    // projectObj.empObjectIdArray = empObjArr;
    // projectObj.projectManager = projectManagerIdObj._id;


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
          empObjectIdArray.push(_id);
        })
      );

      const newProject = await model.project.save({
        ...projectObj,
        empObjectIdArray
      });

      return newProject;
    };


    const newProjectId = (await generateProjectPromise())._id;
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
  const projectList = req.paginatedResults.results;
    const tempList = [];
   await Promise.all(
    projectList.map(async(project) => {
        const manager = await model.employee.get(
          { _id: project.projectManager },
          { name: 1, _id: 0 }
        );

        let member;
        if(project.empObjectIdArray){
        member = await Promise.all(project.empObjectIdArray.map(async(employee) => {
          return ((await model.employee.get(
            { _id: employee },
            { name: 1, _id: 0 }
          )).name);
        }));}

      tempList.push({ project:project, projectManagerName: manager && manager.name ,memberName:member});
      })
    );  

    console.log(tempList[0], tempList[1], tempList[2]);
    
    return res.status(200).send({
      success: true,
      payload: {
        data: {
          tempList,
          result: req.paginatedResults
        },
        message: "projects retrieved"
      }
    });
  }

  async show(req, res) {
    const projectList =await model.project.get({ _id: req.query.projectId });
   
    res.send(projectList);
  }
  async update(req, res) {
     try{
    const projectManager=await  model.projectManager.get({managerName:req.body.managers});
    let projectUpdatedObj = {
     
      projectName: req.body.projectName,
      projectManager: req.body.managers,
      clientName: req.body.clientName,
      status: req.body.status,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      empObjectIdArray: req.body.members,
      status: req.body.status
    };
    //Expecting that req.body will have required details with same keys!!! (Just to save time)
      
                           
    const projectObjId = (await model.project.get({ projectId: req.body.projectId }))._id;
    const project = await model.project.update(
      { _id: projectObjId },
      projectUpdatedObj
    );
    res.send({
      success: true,
      payload: {
        data: project,
        messsage:"project updated successfully"
      }
    });
     }catch(error){
      res.status(400).send({
        success: false,
        payload: {
          message: err.message
        }
      });
     }
  }

  async searchProject(req, res){
   
    let query=req.query.projectName;
    query = query.toLowerCase().trim()
    const projects = await model.project.getforsearch({projectName: { $regex:`^${query}`, $options: 'i'}},{});
    const tempList = [];
    await Promise.all(
     projects.map(async(project) => {
         const manager = await model.employee.get(
           { _id: project.projectManager },
           { name: 1, _id: 0 }
         );
         const member = await model.employee.get(
           { _id: project.empObjectIdArray },
           { name: 1, _id: 0 }
         );
       tempList.push({ project:project, projectManagerName: manager && manager.name ,memberName:member && member.name});
       })
     );  
     
     return res.status(200).send({
       success: true,
       payload: {
         data: {
           tempList,
           result: req.paginatedResults
         },
         message: "projects retrieved"
       }
     });

}
  async delete(req, res) {
    const project = await model.project.delete({ _id: req.query.id });
    res.send({
      success: true,
      payload: {
        employee,
        message: "Project Deleted Successfully"
      }
    });
  }
  
  async indexP(req,res){
    const projectList = await model.project.gets();
   // get page from query params or default to first page
   const page = parseInt(req.query.page) || 1;

   // get pager object for specified page
   const pageSize = 6;
   
   const pager = await pagination.paginate(projectList.length, page, pageSize);

   // get page of items from items array
   const pageOfItems = employeeList.slice(pager.startIndex, pager.endIndex + 1);
   

   // return pager object and current page of items
   return res.json({ pager, pageOfItems });
   
}
}

module.exports = new Project();
