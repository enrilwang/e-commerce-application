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
    created:String, 
    reviews:  [{reviewer:String,
                rating: Number,
                comment:String}]
      
    
})


module.exports = mongoose.model("phoneUser", userPhoneSchema, "userPhone");