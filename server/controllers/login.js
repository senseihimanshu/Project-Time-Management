const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("config");
const Employee = require("../models/employee");

generateToken = async (req, res) => {
  const { email, password } = req.body;
  let employee = await Employee.model.findOne({ email });
  if (!employee)
    return res.status(401).send({
      success: false,
      payload: {
        message: "Invalid email or password"
      }
    });
  const isPassword = await bcrypt.compare(password, employee.password);
  if (!isPassword)
    return res.status(401).send({
      success: false,
      payload: {
        message: "Invalid email or password"
      }
    });

  const token = jwt.sign(
    {
      _id: employee._id,
      empId: employee.empId,
      name: employee.name,
      role: employee.role,
      
    },
    config.get("jwtPrivateKey"),
    { expiresIn: 86400 }
  );

  res.send({
    success: true,
    payload: {
      data: {
        "x-auth-token": token
      }
    },
    message: "Logged in successfully!!"
  });
};

module.exports = generateToken;
