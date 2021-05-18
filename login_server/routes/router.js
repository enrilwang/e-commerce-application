const express=require('express')
const router=express.Router()
const phoneController = require("../controller/phoneController")
const userController = require("../controller/userController")


router.get('/all', phoneController.getAllPhone)

router.get('/seller', phoneController.getBestSeller)

router.get('/search/:title',phoneController.getByTitle)
router.get('/user', userController.getAllUser);
router.post('/signUp', userController.signUp);
router.post('/login', userController.login);
router.get('/cookie',userController.getCookie);



module.exports=router