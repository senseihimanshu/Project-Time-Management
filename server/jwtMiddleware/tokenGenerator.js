const jwt = require("jsonwebtoken");
const tokenVerifier=require("./tokenVerifier");
module.exports = (payload) => {
    const jwtPrivateKey = "thisisjwtsecretkey";
    var i  = 'CyberGroup India Pvt. Ltd.';          // Issuer 
    var s  = 'User Auth';                           // Subject 
    var a  = 'someone@cygrp.com';                   // Audience
    const actualPayload = payload;
    console.log(actualPayload);
          //SIGNING OPTIONS
    var signOptions = {
    issuer:  i,
    subject:  s,
    audience:  a,
    expiresIn: 86400, // expires in 24 hours
    algorithm:  "HS256"
    };
try{
    var token = jwt.sign({data:actualPayload}, jwtPrivateKey,signOptions);
    console.log(token);
    return token;
   }
catch(e){
           return null;
         }
}
