const fs = require('fs')
let users = require('./user.json')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
async function login(req,res){
    const user = req.body;
    const foundUser = users.find((user) => user.username === req.body.username);
    if (!foundUser) {
      return res.status(400).send("Invalid username or password");
    }
    const isPasswordValid = await bcrypt.compare(
      user.password,
      foundUser.password
    );
    if (!isPasswordValid) {
      return res.status(400).send("Invalid Username or password");
    }
    const token = jwt.sign({ user }, "Secret Message",{
      expiresIn: "1h",
    });
    console.log(token);
    //req.session.token = token;
    res.redirect('/employee')
}
async function register(req,res){
    const user = req.body;
    if (!user.username || !user.password) {
        return res.status(400).send("Username and password are required.");
    }
    const hash = await bcrypt.hash(user.password, 10);
    user.password = hash;
    users.push(user);
    fs.writeFileSync('./user.json',JSON.stringify(users),'utf8',(err) => {
        if(err){ console.log(err );}
    })
    res.redirect('/index.ejs');
}

module.exports = {
    login,register
}