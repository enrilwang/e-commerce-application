const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {type:String, required:true},
    lastName: {type:String, required:true},
    email: {type:String, required:true},
    password: {type:String, required:true}
    
})

userSchema.methods.findUsersWithSameEmail = function(callback){
  return this.model('Userlisting').find({email: this.email}, callback)
}


userSchema.methods.findUserbyEmailandPassword = function(callback){
  return this.model('Userlisting').find({email: this.email, password: this.password}, callback)
}

module.exports = mongoose.model("Userlisting", userSchema, "userlisting");