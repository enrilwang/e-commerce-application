const user = require("../models/userlisting")
const crypto = require("crypto")
var jwt = require("jsonwebtoken")


module.exports ={
  
  //get all user information 
  getAllUser:function(req,res,next) {
    user.find().exec()
        .then(data => res.json(data))
        .catch()
  },



  //sign up function
  signUp:function(req, res, next) {
      var newUser = new user();
      let data = req.body;
      
      let password = crypto.createHash("md5").update(data.password).digest("hex");
      newUser.firstName = data.firstName;
      newUser.lastName = data.lastName;
      newUser.email = data.email;
      newUser.password = password;
      
      // check the user with the same email
      newUser.checkSameEmail(function(err,result){
        if(err){
            console.log("error!");
        }else if(result[0]){
            
            res.sendStatus(201);
        }else{
            newUser.save().then(() => {res.sendStatus(200)})
            .catch(err => next(err))
        }
      })  
  },
  


  //login function
  login: function(req, res, next){
    let data = req.body
    var currentUser = new user();
    
    let password = crypto.createHash('md5').update(data.password).digest("hex")
    currentUser.email = data.email;
    currentUser.password = password;

    currentUser.checkEmailandPassword(function(err, users){
      if(err){
          console.log("error!")
      }else if(users[0]){
        let userNow = users[0];
      
        //max age is 10 mins
        
        res.cookie('userToken', jwt.sign({data:data.email} , "shhhhh",{expiresIn: "10h"}) ,{maxAge: 600000})
        res.cookie('userName',userNow.firstName + " " + userNow.lastName,{maxAge: 600000})
        res.cookie('userEmail', userNow.email,{maxAge: 600000})
        
        // res.sendStatus(200)
        // res.writeHead(200, {
        //   "Set-Cookie":"token=dsdsd;HttpOnly",
        //   "Access-Control-Allow-Credentials":"true"
        // }).send();
        
        
        
        
      }else{
        
        //wrong email and password
        res.sendStatus(201);
      }
    })
  },

  //update function 
  updatePassword:function(req, res){
    
    let data = req.body
    let password = crypto.createHash('md5').update(data.password).digest("hex")
    user.update({email: data.email},{password: password}, function(err,res){
      if(err){
        console.log(err)
      }else{
        console.log("update successfully")
        console.log(res)
        res.sendStatus(200)
      }
    })
  },

  signOut: function(req, res) {
    console.log("logout")
    res.clearCookie("userToken").redirect("/");
  },




  getCookie: function(req,res) {
    console.log(req.headers);
    console.log(req.cookies);
    res.status(200).send(req.cookies);
  }
}