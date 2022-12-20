const express =require('express');
const cors = require('cors')
const bodyParser = require('body-parser')
require("dotenv").config()
const app = express()
app.set("view engine","ejs")
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.json())
const session = require("express-session");
app.use(session({
  secret:'Secret Message',
  cookie:{maxAge:60000},
  resave:false,
  saveUninitialized:false
}))
const { getemps, getemp, createemp, updateemp,removeemp } = require('./controller')
const { login,register } = require('./usercontroller')
app.get('/',(req,res)=>{  res.render('index')})
app.get('/employee',(req,res)=>{  getemps(req,res)})
app.get('/employee/:id',(req,res)=>{getemp(req,res,parseInt(req.params.id))})
app.post('/employee/update/:id',(req,res)=>{updateemp(req,res,req.params.id)})
app.post('/employee/delete/:id',(req,res)=>{removeemp(req,res,req.params.id)})
app.post('/employee/add',(req,res)=>{createemp(req,res)})
app.get('/user/register',(req,res)=>{ res.render('register') })
app.post('/user/register',async (req,res)=>{register(req,res)   })
app.post("/user/login", async (req, res) => { login(req,res)});
app.listen(3000,()=>{console.log('server started');}); 