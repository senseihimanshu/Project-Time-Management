const mongoose=require('mongoose');
const schema=require('../schemas');
const projectschema=mongoose.Schema(schema);
class Project{
  constructor(){
    this.model=mongoose.model('Project',projectschema);
  }
  

      async get(criteria){
        return this.model.find();
    }
      async save(projectObj){
        console.log(projectObj, 'Here man!');
        const employee = await this.model.create(projectObj);
          return employee;
         
     }
      async update(criteria={},updatedProjectObj){
         return this.model.update(criteria,updatedProjectObj)
      }
      async delete(criteria){
        return this.model.deleteOne(criteria);
     }
     async log(criteria){
          return this.model.find();
     }
}

module.exports=new Project();