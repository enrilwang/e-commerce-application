var mongoose = require("./connect");



var userPhoneSchema = new mongoose.Schema({
    userid: String,
    email: String,
    image: String,
    stock: Number,
    seller: String,
    price: Number,
    reviews:  [{reviewer:String,
                rating: Number,
                comment:String}]
      
    
})



phoneSchema.statics.findPhoneWithTitle = function(title, callback){
    var str = eval("/" + title +"/i")
    return this.find({'title': {$regex:str},stock:{$gt:0}}).exec(callback)
  }

var phone = mongoose.model("Phonelisting", phoneSchema, "phones");
phone.update({brand:"Samsung"},{$set:{image:"Samung.jpeg"}})




module.exports = phone;