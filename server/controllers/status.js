const model = require("../models");
const schema = require("../schemas");
class Status {
    constructor() {}
    async update(req, res) {
        const {
          empId,
          status
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
          password: password || employeeToUpdate.password
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
    

}