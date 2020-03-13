const mongoose=require('mongoose');
const schema=require('../schemas');
const projectschema = new mongoose.Schema(schema.project);

class Project{
  constructor(){
    this.model=mongoose.model('project',projectschema);
  }
  
     //get the projects of company as per criteria
      async get(criteria={},columns={}){
        return this.model.findOne(criteria,columns={});
    }
    //save the newly created project 
      async save(projectObj){
        const newProject = await this.model.create(projectObj);
            return newProject;

      }
      //to count the no. of projects as per criteria
      async count(criteria={}){
          const projectCount=await this.model.count(criteria);
          return projectCount;
         }
     //update the details of project as per criteria
      async update(criteria={},updatedProjectObj){
         return this.model.update(criteria,updatedProjectObj)
      }
      //delete the project of company as per criteria 
      async delete(criteria={}){
        return this.model.deleteOne(criteria);
     }
     //display all the projects of company
     async log(criteria={}){
          return this.model.find(criteria);
     }
     async getforsearch(criteria={}, columns={})
    {
      
      return this.model.find(criteria, columns).sort({projectName: 1});
}
  async getProject(criteria={}, columns={}){
     return this.model.find({"projectName": `/^$columns/i`}).exec(callback);
  }
  async gets(criteria={}, columns={}){
    return this.model.find(criteria, columns);
}
async getPagignation(criteria={}, columns={}){
  return this.model.find({"name": `/^$columns/i`}).exec(callback);
}
}

module.exports=new Project();