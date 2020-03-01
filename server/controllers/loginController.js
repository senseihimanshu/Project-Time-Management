const model = require("../models");
const jwtHandler = require("../jwtMiddleware");
class employee {
  constructor() {}

  async checkUserAuthentication(req, res) {
      console.log(req.body, 'abha');
    try {
      console.log(model.employee);
      let user = await model.employee.get({ email: req.body.email, password: req.body.password },
      { role: 1, name: 1, _id: 1,empId:1 }
    );
    console.log(user);
    if (user != null || user != []) {
      let token = jwtHandler.tokenGenerator(user);
      if (token != null)
        return res.status("200").send({ auth: true, message: "Valid Token.", jwtToken: token });
      else if (token == null)
        res
          .status("503")
          .send({
            auth: false,
            message: "Some Error Occured while generating token"
          });
    } else {
      res.status("401").send(user);
    }
  }
  catch(error)
  {
    console.log(error);
  }
  }
}
module.exports = new employee();
