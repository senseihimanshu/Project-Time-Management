const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("config");
const database=require('./database/config');
const bodyParser=require('body-parser');

//User Imports
app.use(cors());

//Secret Key Error
if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: secretkey not set");
  process.exit(1);
}

//Using Middlewares
app.use(bodyParser.json());
app.use(express.json());
require("./routes/route.js")(app);


//Listening and setting of port
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening at port ${port}`));
