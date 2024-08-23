const { Message,validate } = require("../models/message")
const _=require('lodash')



module.exports.createMessage=async (req,res)=>{
    const {error}=validate(_.pick(req.body,['email','text']))
            if (error) return res.status(400).send(error.details[0].message);
    const message=new Message(req.body)
    await message.save()
    return res.status(201).send('Message saved to db successfully!!!')
}

module.exports.getMessage=async(req,res)=>{
    const messages=await Message.find()
    return res.status(201).send(messages)

}