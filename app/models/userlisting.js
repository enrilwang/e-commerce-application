var mongoose = require("mongoose");

// mongoose.connect('mongodb://localhost/assignment', { useNewUrlParser: true }, function(){
// 	console.log('mongodb connected')
// });
var userSchema = new mongoose.Schema({
    firstName: {type:String, required:true},
    lastName: {type:String, required:true},
    email: {type:String, required:true},
    password: {type:String, required:true}
    
},{
    versionKey:false
})



// var phone = mongoose.model("Userlisting", userSchema, "userListing");

// phone.find()
// 	.limit(10)
// 	.exec(function(err,result){
// 	if (err){
// 		console.log("Query error!")
// 	}else{
// 		console.log("The earliest revision in CNN is:");
// 		console.log(result)
// 	}	
// });



userSchema.methods.findUsersWithSameEmail = function(callback){
  return this.model('Userlisting').find({email: this.email}, callback)
}


userSchema.methods.findUserbyEmailandPassword = function(callback){
  return this.model('Userlisting').find({email: this.email, password: this.password}, callback)
}

module.exports = mongoose.model("Userlisting", userSchema, "userListing");