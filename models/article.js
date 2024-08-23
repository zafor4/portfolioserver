const {Schema,model}=require('mongoose')
const joi=require('joi')

module.exports.Article=model('Article',Schema({
    user:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    name:{
        type:String,
        required:true,
        minLength:5
    },
    description:{
        type:String,
        required:true,
        minLength:10
    },
    photo:{
        data:Buffer,
        contentType:String
    }
},{timestamps:true}))
