const bcrypt = require("bcrypt");
const model = require("../models");
const nodemailer = require("nodemailer");

require("dotenv").config();
// node function which sends email to new user create
 const nodeMail=async function(output,newEmployee){
   try{
   
    
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
     subject: "Project Portal  Contact Request", // Subject line
     text: "Welcome to Project Portal", // plain text body
     html: output // html body
   }
   transporter.sendMail(info,function(err,data){
      
     if(err){
          console.error("error occurs",err);
        }
        else{
        }
   });
  }catch(error){
    console.error(error);
  }
}

class Employee {
  constructor() {}

  async create(req, res) {
    let {
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

    newEmployee.empId = newEmployee.empId.replace(/ /g, "");

    newEmployee.password = "cyg-" + empId;
   const pass=newEmployee.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newEmployee.password, salt);

    newEmployee.password = hashedPassword;
     
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
    const output = `
        <style>
            .bottom{
              color:grey;
              font-size:0.8rem;
               }
        </style>
     <p>Congratulations,you are registered on our CyberGroup Project-Portal</p>
        <h3>Thanks again for your details</h3>
      <table>
      <tr>
        <td>Name:</td>
        <td>${newEmployee.name}</td>
      </tr>
      <tr>
        <td>Email:</td>
        <td>${newEmployee.email}</td>
      <tr>
      <td>Designation:</td>
      <td>${newEmployee.designation}</td>
      </tr>
      <tr>
      <td>Role:</td>
       <td>${newEmployee.role}</td>
      <tr>
       <td>Phone:
       <td>${newEmployee.phone}</td>
      </tr>
      <tr>
        <td>Password:</td>
        <td>${pass}</td>
      </tr>
        <td>Address:</td>
        <td>${newEmployee.address}</td>
      </tr>
      <tr>
       <td>joining:</td>
       <td>${newEmployee.joining}</td>
    </table>
      <p>Login on our portal with above credentials</p>
      <a href="http://localhost:4200/login">
      <p class="bottom">This is Computer Generated Email ,Don't reply back to it</p>
      `;
    nodeMail(output, newEmployee);
  }
  async index(req, res) {
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
   
 
  async show(req, res) {
    const employee = await model.employee.get({ empId: req.params.id });

    if (!employee) {
      return res.status(404).send({
        payload: {
          data: {
            employee
          }
        },
        message: "Employee does not exists!"
      });
    }

    res.status(200).send({
      payload: {
        data: {
          employee
        }
      },
      message: "Employee retrieved successfully"
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
      role,
      oldPassword
     
    } = req.body;
    const employeeToUpdate = await model.employee.get({ empId });
    const isPassword = await bcrypt.compare(oldPassword, employeeToUpdate.password);
    if (!isPassword){
      return res.status(401).send({
        success: false,
        payload: {
          message: "Incorrect password"
        }
      });
    } 
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
    Object.keys(patchedEmployee).forEach(
      key => patchedEmployee[key] === undefined && delete patchedEmployee[key]
    );
   
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(patchedEmployee.password, salt);
        
      patchedEmployee.password = hashedPassword;
       
      await model.employee
        .update({ empId: empId }, patchedEmployee)
        .then(() => {
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
    const employee = await model.employee.delete({ _id: req.params.id });
    
    await model.timesheet.deleteMany({ empObjId: req.params.id });

    await model.projectManager.deleteMany({ staffId: req.params.id });
    await model.projectManager.deleteMany({ managerId: req.params.id });

    res.send({
      success: true,
      payload: {
        employee,
        message: "Employee Deleted Successfully"
      }
    });
  }
}
module.exports = new Employee();
