import express from 'express'
import controller from '../controllers/productions'

const router = express.Router()

router.get('/', controller.list)
router.get('/:id', controller.get)
router.post('/', controller.create)
router.delete('/:id', controller.remove)


export = router