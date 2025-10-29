const { createProject, getProjects, getProjectById, deleteProject, getPhoto,toggleProject }=require('../controllers/projectController')
const authorize=require('../middlewares/authorize')
const admin=require('../middlewares/admin')

const router=require('express').Router()


router.route('/')
.post([authorize,admin],createProject)
.get(getProjects)

router.route('/:id')
.get(getProjectById)
.delete([authorize,admin],deleteProject)

router.route('/photo/:id')
.get(getPhoto)
router.route('/:id')
.put([authorize,admin],toggleProject)

module.exports=router