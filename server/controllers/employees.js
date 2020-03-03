const model = require("../models");
const schema = require("../schemas");

const isUnique = async function(empId, email) {
  const employeeWithEmpId = await model.employee.get({ empId });
  const employeeWithEmail = await model.employee.get({ email });

  if (employeeWithEmpId)
    return { status: false, message: "EmployeeId already exists" };
  if (employeeWithEmail)
    return { status: false, message: "Email already exists" };

  return { status: true };
};

class Employee {
  constructor() {}

  async create(req, res) {
    console.log(req.body);
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
    newEmployee.password = `${empId}${name}`;

    console.log(req.body);

    const resultAfterIsUnique = await isUnique(empId, email);
    if (!resultAfterIsUnique.status) {
      return res.status(401).send({
        success: false,
        payload: {
          message: resultAfterIsUnique.message
        }
      });
    }

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
  }

  async index(req, res) {
   // console.log("dikhaa rha huu");
    const employeeList = await model.employee.log(
      {},
      { name: 1, designation: 1, role: 1, email: 1, phone: 1, empId: 1 }
    );
    res.send(employeeList);
    console.log(employeeList);
  }

  async show(req, res) {
    console.log(req.query.empId);
    const employee = await model.employee.get({ empId: req.query.empId });
  //  const date = new Date(employee.joining);
  //   employee.joining=date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate();
    console.log(employee);
    if (!employee) {
      console.log("Request is coming");
      return res.status(404).send({
        success: false,
        payload: {
          employee,
          message: "Employee does not exist"
        }
      });
    }

    res.send({
      success: true,
      payload: {
        employee,
        message: "Employee retrieved successfully"
      }
    });
  }

  async update(req, res) {
    const {
      empId,
      email,
      name,
      designation,
      joining,
      phone,
      address,
      password,
      projectId
    } = req.body;

    const employeeToUpdate = await model.employee.get({ empId });
    console.log(empId);
    const patchedEmployee = {
      email: email || employeeToUpdate.email,
      name: name || employeeToUpdate.name,
      designation: designation || employeeToUpdate.designation,
      joining: joining || employeeToUpdate.joining,
      phone: phone || employeeToUpdate.phone,
      address: address || employeeToUpdate.address,
      password: password || employeeToUpdate.password,
      projectId:projectId || employeeToUpdate.projectId
    };

    console.log(patchedEmployee);
    // const newEmployee = new Employee(patchedEmployee);

    try {
      await model.employee.update(patchedEmployee).then(() => {
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
    console.log(req.query.empId);
    const employee = await model.employee.delete({ empId: req.query.empId });
    console.log(employee);
    // if(!employee){
    //   res.send({
    //     success: false,
    //     payload: {
    //       message: 'Employee cannot be deleted as not found'
    //     }
    //   });
    // }
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
