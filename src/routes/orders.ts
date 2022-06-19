import express from 'express'
import controller from '../controllers/orders'

const router = express.Router()

router.get('/send', controller.send)
router.get('/:id', controller.get)
router.delete('/:id', controller.remove)
router.put('/:id', controller.update)
router.post('/', controller.create)
router.get('/', controller.list)

export = router