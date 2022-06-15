import express from 'express'
import controller from '../controllers/products'
import multer from 'multer'
const upload = multer({ dest: 'uploads/' })

const router = express.Router()

router.get('/:id', controller.get)
router.delete('/:id', controller.remove)
router.put('/:id', controller.update)
router.post('/', upload.array('images'), controller.create)
router.get('/', controller.list)

export = router