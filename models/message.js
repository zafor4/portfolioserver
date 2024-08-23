const {Schema,model}=require('mongoose')
const joi=require('joi')


module.exports.Message=model('Message',Schema({
    email:{
        type:String,
        required:true,
    },
    text:{
        type:String,
        required:true
    }
},{timestamps:true}))

module.exports.validate=message=>{
    const schema=joi.object({
        email:joi.string().required(),
        text:joi.string().required(),
    })
    return schema.validate(message)
}