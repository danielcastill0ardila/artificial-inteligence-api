'use strict'
import fileController from '../controllers/file.controller'
//import valueValidate from '../models/value/value.validate'
import { errors } from 'celebrate'

export default (app) => {
  app.post('/api/verification',fileController.verificationController)
  app.use(errors())
};
