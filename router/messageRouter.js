const { createMessage, getMessage } = require('../controllers/messageController')

const router=require('express').Router()





router.route('/')
.post(createMessage)
.get(getMessage)

module.exports=router