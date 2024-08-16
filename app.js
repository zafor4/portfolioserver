require('express-async-errors')
const express=require('express')
const error = require('./middlewares/error')
const app=express()



require('./middlewares')(app)
require('./middlewares/routes')(app)

app.use(error)


module.exports=app