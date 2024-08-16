const _=require('lodash')
const fs=require('fs')
const formidable=require('formidable')
const { validate, Project }=require('../models/project')

module.exports.createProject=async (req,res)=>{
    let form =new formidable.IncomingForm();
    form.keepExtentions=true

    form.parse(req, async (err,fields,files)=>{
        if(err) return res.status(400).send("Error in parsing")
            const photoFile=Array.isArray(files.photo)?files.photo[0]:files.photo
        if (!photoFile) return res.status(400).send("No image provided!!")

            const projectFields={
                name:String(fields.name),
                description:String(fields.description),
                github:String(fields.github),
                preview:String(fields.preview),
            }
            const {error}=validate(_.pick(projectFields,['name','description']))
            if (error) return res.status(400).send(error.details[0].message);

            const project=new Project(projectFields)

            const data=await fs.promises.readFile(photoFile.filepath||photoFile.path)
            project.photo.data=data,
            project.photo.contentType=photoFile.mimetype

            const result=await project.save()
            return res.status(201).send({
                message:"Project saved sucessfully!!",
                data:_.pick(result,['name','description','github','preview'])
            })
    })

}
module.exports.getProjects=async (req,res)=>{
const projects=await Project.find()
.select({photo:0})
return res.status(201).send(projects)

}
module.exports.getProjectById=async (req,res)=>{
    const projectId=req.params.id
    const project=await Project.findById(projectId)
    .select({photo:0})
    if (!project) return res.status(404).send("Not found")
        return res.status(201).send(project)

}

module.exports.getPhoto=async (req,res)=>{
    const projectId=req.params.id
    const project=await Project.findById(projectId)
    if (!project) return res.status(404).send("Not found")
        res.set('Content-Type',project.photo.contentType)
    return res.status(201).send(project.photo.data)

}
module.exports.deleteProject=async (req,res)=>{
const projectId=req.params.id
await Project.findByIdAndDelete(projectId)
return res.status(201).send("Project deleted ")
}