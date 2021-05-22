var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
    firstName: {type:String, required:true},
    lastName: {type:String, required:true},
    email: {type:String, required:true},
    password: {type:String, required:true}
    
},{
    versionKey:false
})




userSchema.methods.checkSameEmail = function(callback){
  return this.model('Userlisting').find({email: this.email}, callback)
}


userSchema.methods.checkEmailandPassword = function(callback){
  return this.model('Userlisting').find({email: this.email, password: this.password}, callback)
}

userSchema.methods.checkPassword = function(callback){
  return this.model('Userlisting').find({_id: this.id, password: this.password}, callback)
}


module.exports = mongoose.model("Userlisting", userSchema, "users");