const {Schema,model}=require('mongoose')
const joi=require('joi')

module.exports.Project=model('Project',Schema({
    name:String,
    description:{
        type:String,
        required:true,
        minLength:10,
    },
    server:String,
    client:String,
    preview:String,
    photo:{
        data:Buffer,
        contentType:String
    }
},{timestamps:true}))

module.exports.validate=project=>{
    const schema=joi.object({
        name:joi.string().required(),
        description:joi.string().required().min(10),
    })
    return schema.validate(project)
}