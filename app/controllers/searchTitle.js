var phone = require("../models/phonelisting");

    




module.exports = {
    

    //find all phone
    searchTitle : function(req,res) {
        phone.find({}).limit(2).exec()
             .then(data => res.json(data)).catch()




        // title = req.query.title;
        // console.log(title);

        // phone.findTitleLatestRev(title, function(err,result){
            
        //     if (err){
        //         console.log("Cannot find " + title + ",s latest revision!")
        //     }else{
        //          console.log(result)
        //         //revision = result[0];
                
        //         //res.render('revision.pug',{title: title, revision:revision})
        //     }	
        // })	
        

        

       
        // console.log(req.query.title);
        // phone.find({}).exec()
        //     .then(data => res.json(data)).catch()


        
    }





}