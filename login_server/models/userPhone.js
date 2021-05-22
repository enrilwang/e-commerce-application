var mongoose = require("./connect");



var userPhoneSchema = new mongoose.Schema({
    userid: String,
    email: String,
    title: String,
    brand: String,
    image: String,
    stock: Number,
    seller: String,
    price: Number,
    quantity:Number,
    created:Number, //0 means not created by user, 1 means created by user
    reviews:  [{reviewer:String,
                rating: Number,
                comment:String}]
      
    
})



// phoneSchema.statics.findPhoneWithTitle = function(title, callback){
//     var str = eval("/" + title +"/i")
//     return this.find({'title': {$regex:str},stock:{$gt:0}}).exec(callback)
//   }






  module.exports = mongoose.model("phoneUser", userPhoneSchema, "userPhone");