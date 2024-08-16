const router=require('express').Router()
const { signUp, logIn }=require('../controllers/usercontroller')


router.route('/signup')
.post(signUp)

router.route('/login')
.post(logIn)

module.exports=router