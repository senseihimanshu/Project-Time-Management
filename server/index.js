const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("config");
const database=require('./database/config');
const bodyParser=require('body-parser');
const nodemailer=require('nodemailer');
const exphbs=require('express-handlebars');
//User Imports
const employeeRoutes = require("./routes/employee");

//Secret Key Error
if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: secretkey not set");
  process.exit(1);
}

//Using Middlewares
//view engine setup
app.engine('handlebars',exphbs());
app.set('view engine','handlebars');
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
require("./routes/route.js")(app);

//Adding Routes
app.use("/api/employee", employeeRoutes);

//Listening and setting of port
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening at port ${port}`));
