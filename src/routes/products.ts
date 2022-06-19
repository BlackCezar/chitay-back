import express from 'express'
import controller from '../controllers/products'
import multer from 'multer'
import * as path from 'path'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./../chigay-front/dist/imgs/uploads");
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(
        null,
        file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
      );
    },
  });

const upload = multer({ storage });


const router = express.Router()

router.get('/:id', controller.get)
router.delete('/:id', controller.remove)
router.put('/:id', controller.update)
router.post('/', upload.array('images'), controller.create)
router.get('/', controller.list)

export = router