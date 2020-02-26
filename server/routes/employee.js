const express = require("express");
const router = express.Router();
const Employee = require("../models/employee");

router.get("/", async (req, res) => {
  const employee = await Employee.findOne({ empId: req.query.empId });

  if (!employee) {
    res.status(404).send({
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
});

router.post("/", async (req, res) => {
  const { empId, email, name, designation, joining, phone, address } = req.body;

  const newEmployee = new Employee({
    empId,
    email,
    name,
    designation,
    joining,
    phone,
    address
  });
  newEmployee.password = `${empId}${name}`;

  const resultAfterIsUnique = await newEmployee.isUnique(empId, email);
  if (!resultAfterIsUnique.status) {
    return res.status(401).send({
      success: false,
      payload: {
        message: resultAfterIsUnique.message
      }
    });
  }

  try {
    await Employee.create(newEmployee).then(() => {
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
});

router.put("/", async (req, res) => {
  const {
    empId,
    email,
    name,
    designation,
    joining,
    phone,
    address,
    password
  } = req.body;

  const employeeToUpdate = await Employee.findOne({ empId });
  const patchedEmployee = {
    email: email || employeeToUpdate.email,
    name: name || employeeToUpdate.name,
    designation: designation || employeeToUpdate.designation,
    joining: joining || employeeToUpdate.joining,
    phone: phone || employeeToUpdate.phone,
    address: address || employeeToUpdate.address,
    password: password || employeeToUpdate.password
  };

  const newEmployee = new Employee(patchedEmployee);

  if (email) {
    const resultAfterIsUnique = await newEmployee.isUnique(null, email);
    if (!resultAfterIsUnique.status) {
      return res.status(401).send({
        success: false,
        payload: {
          message: resultAfterIsUnique.message
        }
      });
    }
  }

  try {
    await Employee.updateOne(patchedEmployee).then(() => {
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
});

module.exports = router;
