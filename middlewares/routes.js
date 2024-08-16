const userRouter=require('../router/userRouter')
const projectRouter=require('../router/projectRouter')
const articleRouter=require('../router/articleRouter')

module.exports=app=>{
    app.use('/api/user',userRouter)
    app.use('/api/project',projectRouter)
    app.use('/api/article',articleRouter)
    
}