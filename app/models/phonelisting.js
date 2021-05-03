var mongoose = require("mongoose");



var phoneSchema = new mongoose.Schema({
    title: String,
    brand: String,
    image: String,
    stock: Number,
    seller: String,
    price: Number,
    reviews:  [{reviewer:String,
                rating: Number,
                comment:String}]
      
    
})



phoneSchema.statics.findPhoneWithTitle = function(title, callback){
    return this.find({title: /title/i}).exec(callback)
  }

module.exports = mongoose.model("Phonelisting", phoneSchema, "phoneListing");