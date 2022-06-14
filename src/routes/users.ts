import express from 'express'
import controller from '../controllers/users'

const router = express.Router()

router.get('/', controller.list)
router.post('/auth', controller.auth)
router.get('/logout', controller.logout)
router.get('/check', controller.check)
router.get('/:id', controller.get)
router.post('/', controller.create)

export = router