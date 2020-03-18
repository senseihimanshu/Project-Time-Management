const bcrypt = require('bcrypt');
const model = require("../models");
const schema = require("../schemas");
const nodemailer=require('nodemailer');
var generatePassword = require('password-generator');


require('dotenv').config();
// node function which sends email to new user create
 const nodeMail=async function(output,newEmployee){
   try{
   console.log("deepanshu");
    
     let testAccount = await nodemailer.createTestAccount();

     // create reusable transporter object using the default SMTP transport
         let transporter = nodemailer.createTransport({
         service:'gmail',
          auth:{
           user:process.env.EMAIL,
           pass:process.env.PASSWORD
         }
      });
  // send mail with defined transport object
  let info ={
     from: '"balanideepanshu92@gmail.com"', // sender address
     to:newEmployee.email, // list of receivers
     subject: "Node Contact Request", // Subject line
     text: "Hello world?", // plain text body
     html: output // html body
   }
   transporter.sendMail(info,function(err,data){
    debugger   
     if(err){
          console.error("error occurs",err);
        }
        else{
          console.log("email sent successfully");
        }
   });
  }catch(error){
    console.error(error);
  }
}

class Employee {
  constructor() {}

  async create(req, res) {
 
    const {
      empId,
      email,
      name,
      designation,
      joining,
      phone,
      address,
      role
    } = req.body;

    const newEmployee = {
      empId,
      email,
      name,
      designation,
      joining,
      phone,
      address,
      role
    };

    newEmployee.password = 'cyg-'+empId;
     let pass=newEmployee.password

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newEmployee.password, salt);
    
    newEmployee.password  = hashedPassword;

    try {
      await model.employee.save(newEmployee).then(() => {
        res.status(201).send({
          success: true,
          payload: {
            message: "Employee created successfully"
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
    const output=`

     <p>you have a new contact request</p>
     <p>Thanks again for 
      <h3>your details</h3>
      <ul>
      <li>Name:${newEmployee.name}</li>
      <li>Email:${newEmployee.email}</li>
      <li>Designation:${newEmployee.designation}</li>
      <li>Role:${newEmployee.role}</li>
      <li>Phone:${newEmployee.phone}</li>
      <li>Password:${pass}</li>
      <li>Address:${newEmployee.address}</li>
      <li>joining:${newEmployee.joining}</li>
      </ul>
      <p>This is Computer Generated Email ,Don't reply back to it</p>
      `
      nodeMail(output,newEmployee);
  }
  async index(req, res) {
    const employeeList = await model.employee.log(
      { $and: [ { "_id":{ $ne:req.employee._id }} ] },
      { name: 1, designation: 1, role: 1, email: 1, phone: 1, empId: 1 }
    );

    console.log(employeeList, 'List of Employees');

    return res.status(200).send({
      success: true,
      payload: {
        data: {
          result: req.paginatedResults
        },
        message: "employees retrieved"
      }
    });
  }
   
   async indexByRole(req, res) {
    const projectManagerList = await model.employee.log(
      {$and:[{"_id":{$ne:"5e6338721abe492c4080f558" }},{"empId":{$ne:req.query.empId}},{role:"Project Manager"}]},
      { name: 1, designation: 1, role: 1, email: 1, phone: 1, empId: 1 }
    ) ;
    const projectMemberList = await model.employee.log(
      {$and:[{"_id":{$ne:"5e6338721abe492c4080f558" }},{"empId":{$ne:req.query.empId}},{role:"Employee"}]},
      { name: 1, designation: 1, role: 1, email: 1, phone: 1, empId: 1 }
    ) ;
    return res.status(200).send({
      success: true,
      payload: {
        data: {
           projectManagerList,
           projectMemberList
        },
        message: "employees retrieved"
      }
    });
  }
 
  async show(req, res) {
    const employee = await model.employee.get({ empId: req.params.id});
   
    if (!employee) {
      return res.status(404).send({ 
        payload: {
          data: {
            employee
          }
        },
        message:"Employee does not exists!"
      });
    }

    res.status(200).send({
      payload: {
        data: {
          employee
        }
      },
      message:"Employee retrieved successfully"
    });
  }
  
  async update(req, res) {
    const empId = req.params.id;
    const {
      email,
      name,
      designation,
      joining,
      phone,
      address,
      password,
      projectId,
      role
    } = req.body;

    const employeeToUpdate = await model.employee.get({ empId });
    const patchedEmployee = {
      email: employeeToUpdate.email !== email ? email : undefined,
      name,
      designation,
      joining,
      phone,
      address,
      password,
      projectId,
      role
    };

    //discarding keys with undefined
    Object.keys(patchedEmployee).forEach(key => patchedEmployee[key] === undefined && delete patchedEmployee[key])

    try {
      await model.employee.update({ empId: empId }, patchedEmployee).then(() => {
        res.status(200).send({
          success: true,
          payload: {
            message: "Employee updated successfully"
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

  async delete(req, res) {
    const employee = await model.employee.delete({ empId: req.params.id });
   
    res.send({
      success: true,
      payload: {
        employee,
        message: 'Employee Deleted Successfully'
      }
    });
  }
}
module.exports = new Employee();
