const express=require('express');
const bodyParser=require('body-parser')
const app=express();
const cors = require('cors');
const database=require('./database/config')
app.use(bodyParser.json());
app.use(cors({origin: '*'}));
require('./routes/route.js')(app)


app.listen(3000,()=>{
	console.log("listening port 3000");
})



app.get("/",(req,res)=>{
	console.log("Hello,This is node")
	res.send({"text":"welcome to node js"})
})

app.post("/newroute",(req,res)=>{
	console.log(req.body)
	res.send({session:`my age:${req.body.age}` , name:`my name:${req.body.name}`})
})