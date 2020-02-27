const model = require("../models");
const schema = require("../schemas")

class Employee {
  constructor() {
    //
    console.log("controllers me hu");
  }

  async create(req, res) {
    let employeeObj = {
      name: req.body.name,
      phoneNo: req.body.phoneNo,
      email: req.body.email,
      designation: req.body.designation,
      password: req.body.password,
      address:req.body.address
     
    };
    const employee = await model.employee.save(employeeObj);
    res.send(employee);
  }

  async index(req, res) {
    const employeeList = await model.employee.log({},{"name":1,
                                                           "designation":1,
                                                             "age":1});
    res.send(employeeList);
  }

  async show(req, res) {
    const employeeList = await model.employee.get({ _id: req.params.id });
    res.send(employeeList);
  }

//   async update(req, res) {
//     try {
//       let employeeUpdatedObj = {
//         name: req.body.name,
//         email: req.body.email,
//         phone: req.body.phone,
//         address: {
//           city: req.body.address.city,
//           state: req.body.address.state,
//           country: req.body.address.country,
//           pincode: req.body.address.pincode
//         },
//         designation: req.body.designation,
//         age: req.body.age,
//         technologies: req.body.technologies
//       };
//       const updatedEmployee = await model.employee.update(
//         { _id: req.params.id },
//         employeeUpdatedObj
//       );
//       console.log("UPDATED");
//       res.send("UPDATED");
//     } catch (e) {
//       console.log(e);
//     }
//   }

async update(req, res) {
    const employee = await model.employee.update(
      { _id: req.params.id },
      { $set: { email: req.body.email } }
    );
    res.send(employee);
  }

  async delete(req, res) {
    console.log("running")
    const employee = await model.employee.delete({ _id: req.params.id });
    res.send(employee);
  }
}
module.exports = new Employee();
