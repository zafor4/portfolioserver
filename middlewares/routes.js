const userRouter=require('../router/userRouter')
const projectRouter=require('../router/projectRouter')
const articleRouter=require('../router/articleRouter')
const messageRouter=require('../router/messageRouter')

module.exports=app=>{
    app.use('/api/user',userRouter)
    app.use('/api/project',projectRouter)
    app.use('/api/article',articleRouter)
    app.use('/api/message',messageRouter)
    
}