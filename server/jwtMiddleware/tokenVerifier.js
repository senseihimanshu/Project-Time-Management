const jwt = require("jsonwebtoken");
const fs = require("fs");
module.exports=(req, res)=> {
    const jwtPrivateKey = "thisisjwtsecretkey";
    var i  = 'CyberGroup India Pvt. Ltd.';          // Issuer 
    var s  = 'User Auth';                           // Subject 
    var a  = 'someone@cygrp.com';                   // Audience

    var verifyOptions = {
        issuer:  i,
        subject:  s,
        audience:  a,
        expiresIn: 86400 ,
        algorithm:  ["RS256"]
    };
    var token = req.headers['x-access-token'];
    if (!token)
      return res.status(403).send({ auth: false, message: 'No token provided.' });
      try{
    return(jwt.verify(token, jwtPrivateKey, verifyOptions));
     }
    catch(err){
     return false;
    }
    }