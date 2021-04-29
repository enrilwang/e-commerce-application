const mongoose = require("mongoose");

const phoneSchema = new mongoose.Schema({
    title: String,
    brand: String,
    image: String,
    stock: Number,
    seller: String,
    price: Number,
    reviews: Object
    
})

phoneSchema.methods.findPhoneWithTitle = function(callback){
    return this.model('Phonelisting').find({title: this.title}, callback)
  }

module.exports = mongoose.model("Phonelisting", phoneSchema, "phonelisting");