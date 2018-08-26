'use strict'
import fileController from '../controllers/file.controller'

import multer from 'multer'

const upload = multer({
  storage: multer.memoryStorage()
})

export default (app) => {

  app.post('/api/verification',fileController.verificationController)
  app.post('/api/file', upload.array('files', 100), fileController.AddFile)

}
