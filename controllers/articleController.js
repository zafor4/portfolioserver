const { Article }=require('../models/article')
const _=require('lodash')
const fs=require('fs')
const formidable=require('formidable')


module.exports.createArticle=async (req,res)=>{
    let form =new formidable.IncomingForm();
    form.keepExtentions=true

    form.parse(req, async (err,fields,files)=>{
        if(err) return res.status(400).send("Error in parsing")
            const photoFile=Array.isArray(files.photo)?files.photo[0]:files.photo
        if (!photoFile) return res.status(400).send("No image provided!!")

            const articleFields={
                user:req.user._id,
                name:String(fields.name),
                description:String(fields.description),
            }

            const article=new Article(articleFields)

            const data=await fs.promises.readFile(photoFile.filepath||photoFile.path)
            article.photo.data=data,
            article.photo.contentType=photoFile.mimetype
            const result=await article.save()
            return res.status(201).send({
                message:"Project saved sucessfully!!",
                data:_.pick(result,['user','name','description'])
            })
    })
}
module.exports.getArticles=async (req,res)=>{
    const articles=await Article.find()
    .select({photo:0})
    .populate('user','role')
    return res.status(201).send(articles)
}

module.exports.getArticleById=async (req,res)=>{
    const articleId=req.params.id
    const article=await Article.findById(articleId)
    .select({photo:0})
    .populate('user','role')
    if (!article) return res.status(404).send("Not found")
        return res.status(201).send(article)

}
module.exports.getArticlePhoto=async (req,res)=>{
    const articleId=req.params.id
    const article=await Article.findById(articleId)
    if (!article) return res.status(404).send("Not found")
        res.set('Content-Type',article.photo.contentType)
    return res.status(201).send(article.photo.data)
}

module.exports.deleteArticle=async (req,res)=>{
    const articleId=req.params.id
await Article.findByIdAndDelete(articleId)
return res.status(201).send("Article deleted ")
}