const { createMessage, getMessage } = require('../controllers/messageController')
const authorize=require('../middlewares/authorize')
const admin=require('../middlewares/admin')

const router=require('express').Router()





router.route('/')
.post(createMessage)
.get([authorize,admin],getMessage)

module.exports=router