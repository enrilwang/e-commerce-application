const phone = require("../models/phonelisting");

    




module.exports = {
    

    //find all phone
    searchTitle : function(req,res) {

        //db = phone.getSiblingDB('assignment')
        phone.find({title: /Cricket Samsung Galaxy Discover R740 Phone/}).exec().then(data => res.json(data)).catch()
    
        

        console.log("call");
        // console.log(req.query.title);
        // phone.find({}).exec()
        //     .then(data => res.json(data)).catch()


        
    }





}