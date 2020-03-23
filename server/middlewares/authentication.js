const jwt = require("jsonwebtoken");
const config = require("config");

authenticator = (req, res, next) => {
  let token;
  try{
    token = req.header('Authorization').replace('Bearer ','');
  }catch(error){
    return res.status(500).send({
      success: false,
      payload: {
        message: 'You are not authorized to view this page'
      }
    });
  }

  if (!token)
    return res.status(401).send({
      success: false,
      payload: {
        message: "Token Not Provided. Hence, Unauthorized"
      }
    });

  try {
    const payload = jwt.verify(token, config.get("jwtPrivateKey"));
    req.employee = payload;
    next();
  } catch (e) {
    res.status(400).send({
      success: false,
      payload: {
        message: "Invalid Token"
      }
    });
  }
};

module.exports = authenticator;
