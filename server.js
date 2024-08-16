require('dotenv/config')
const app=require('./app')


const mongoose=require('mongoose')


const DB=process.env.MONGODB_SERVER.replace('<PASSWORD>',process.env.DB_PASSWORD)

mongoose.connect(DB)
.then(()=>console.log("COnnected to mongodb!!!"))
.catch(err=>console.log("MongoDB connection failed!!!"))


const port=process.env.PORT ||3001

app.listen(port,()=>console.log(`Listening on port ${port}`))