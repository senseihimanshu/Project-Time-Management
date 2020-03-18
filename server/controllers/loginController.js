const model = require("../models");
const jwtHandler = require("../jwtMiddleware");
class employee {
  constructor() {}

  async checkUserAuthentication(req, res) {
    const user = await model.employee.get(
      { email: req.body.email, password: req.body.password },
      { role: 1, name: 1, _id: 1, empId: 1 }
    );
    if (user == null) {
      //console.log("False", user);
      res
        .status(401)
        .send({ auth: false, message: "Invalid Credentials", userobj: user });
    } else {
      let token = jwtHandler.tokenGenerator(user);
      if (token != null) {
        return res
          .status(200)
          .send({ auth: true, message: "Valid Token.", jwtToken: token });
      } else if (token == null) {
        res.status("503").send({
          auth: false,
          message: "Some Error Occured while generating token"
        });
      }
    }
  }
}
module.exports = new employee();
