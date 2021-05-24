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
  

  //get the user cookie
  getCookie: function(req,res) {
    res.setHeader("Access-Control-Allow-Origin","http://localhost:8080")
    res.setHeader("Access-Control-Allow-Credentials","true")
    res.json({
      status:'0',
      msg:"",
      result:{
        cookie:req.cookies
      }
    })
    
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
            newUser.save().then(() => {
              res.setHeader("Access-Control-Allow-Origin","http://localhost:8080")
              res.sendStatus(200)
            })
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
          res.json({status:"1"})
          console.log("error!")
      }else if(users[0]){
        let userNow = users[0];
      
        //max age is 10 mins
        //set the cookie
        res.cookie('userToken', jwt.sign({data:data.email} , "shhhhh",{expiresIn: "10h"}) ,{maxAge: 3600000})
        res.cookie('userName',userNow.firstName + " " + userNow.lastName,{maxAge: 3600000})
        res.cookie('userEmail', userNow.email,{maxAge: 3600000})
        res.cookie('id',userNow.id,{maxAge: 3600000})
        res.setHeader("Access-Control-Allow-Origin","http://localhost:8080")
        res.setHeader("Access-Control-Allow-Credentials","true")
        console.log(userNow.id)
        res.json({
          status:'0',
          msg:"",
          result:{
            userName:userNow.firstName + " " + userNow.lastName,
            userEmail:userNow.email,
            
          }
        })
      }else{
        //wrong email and password
        res.sendStatus(201);
      }
    })
  },

  //log out function 
  signOut: function(req, res) {
    
    res.clearCookie("userToken");
    res.clearCookie("userEmail");
    res.clearCookie("userName");
    res.clearCookie("id")
    res.setHeader("Access-Control-Allow-Origin","http://localhost:8080")
    res.setHeader("Access-Control-Allow-Credentials","true")
    res.sendStatus(200)
  },


  //update function 
  updatePassword:function(req, res){
    
    let data = req.body
    console.log(data)
    let currentPassword = crypto.createHash('md5').update(data.current).digest("hex")
    let newPassword = crypto.createHash('md5').update(data.new).digest("hex")
    var currentUser = new user();
    
    currentUser._id = data.id
    currentUser.password = currentPassword;
    currentUser.checkPassword(function(err,doc){
      if(err){
        res.sendStatus(201)
      }else if(doc[0]){ 
        user.update({_id: data.id},{password: newPassword}, function(err,res){
          if(err){
            console.log(err)
          }else{
            console.log("update successfully")
          }
        })
        res.sendStatus(200)
      }else {
        res.sendStatus(201)
      }
    })
    
  },


  //update the profile
  updateProfile:function(req, res){
    
    let data = req.body
    console.log(data)
    let password = crypto.createHash('md5').update(data.password).digest("hex")
    var currentUser = new user();
    
    currentUser._id = data.id
    currentUser.password = password;
    currentUser.checkPassword(function(err,doc){
      if(err){
        res.sendStatus(201)
      }else if(doc[0]){
        user.update({_id: data.id},{email: data.email,firstName:data.firstName,lastName:data.lastName}, function(err,res){
          if(err){
            console.log(err)
          }else{
            console.log("update successfully")
          }
        })
        res.json({
        
          result:{
            userName:userNow.firstName + " " + userNow.lastName,
            userEmail:userNow.email,
            
          }
        })
        res.clearCookie("userEmail");
        res.clearCookie("userName");
        res.sendStatus(200)
      }else {
        res.sendStatus(201)
      }
    })
    
  }

}
