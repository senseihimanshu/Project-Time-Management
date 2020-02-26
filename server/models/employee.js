const mongoose = require('mongoose');
const schema=require('../schemas')
const employeeSchema=mongoose.Schema(schema.employee);
class Employee{
        constructor(){
            this.model=mongoose.model('Employee',employeeSchema)
        }
        async get(criteria={}){
            return this.model.find(criteria)
        }
        async save(employeeobj){
            return this.model.create(employeeobj)
        }
        async update(criteria={},updateobj){
            return this.model.update(criteria,updateobj)
        }
        async delete(criteria={})
        {    
            return this.model.deleteOne(criteria);
        }
        async show(criteria={})
        {
        return this.model.find(criteria);
        }
}
module.exports=new Employee();