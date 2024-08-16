const {Schema,model}=require('mongoose')
const joi=require('joi')
const jwt=require('jsonwebtoken')



const userSchema=Schema({
    name:{
        type:String,
        required:true,
        minLength:3,
        maxLength:255,
    },
    email:{
        type:String,
        required:true,
        minLength:5,
        maxLength:255,
        unique:true
    },
    password:{
        type:String
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    }
},{timestamps:true})



userSchema.methods.generateJWT=function(){
    const token=jwt.sign({
        _id:this._id,
        email:this.email,
        role:this.role,
        name:this.name,
    },process.env.JWT_SECRET_KEY,{expiresIn:'10d'})
    return token
}


const validateUser=user=>{
    const schema=joi.object({
        name:joi.string().min(3).max(100).required(),
        email:joi.string().min(5).max(255).required(),
        password:joi.string().min(5).max(255)
    })
    return schema.validate(user)
}


module.exports.User=model('User',userSchema)
module.exports.validate=validateUser