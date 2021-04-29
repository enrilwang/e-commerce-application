const express = require('express')
//const userController = require('../controllers/userController')

const searchTitle =require('../controllers/searchTitle')
const router = express.Router()



router.get('/',searchTitle.searchTitle)




module.exports = router;