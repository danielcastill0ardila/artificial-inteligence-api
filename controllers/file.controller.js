'use strict'

import verificationFace from '../services/verificationFace';
import googleStorage from '@google-cloud/storage'
import shortid from 'shortid'
import config from '../config/config'
import fs from 'fs'

let tokenId = shortid.generate()

const storage = googleStorage({
  keyFilename: `${__dirname}/../config/credentials/firebase_storage.json`
})
const bucket = storage.bucket('gs://ia-semester.appspot.com')

const UploadStorageFirebase = (files) => {

  let prom = new Promise((_resolve, _reject) => {

    let arrayFile = []

    if (files.length <= 0) {
      _reject('Not file')
    }

    files.map((file, i) => {

      let nameFile = `${Date.now()}${i}`
      let folderPath = `files`
      let newFileName = `${folderPath}/${nameFile}`

      let fileUpload = bucket.file(newFileName)

      const blobStream = fileUpload.createWriteStream({
        metadata: {
          contentType: file.mimetype,
          metadata: {
            firebaseStorageDownloadTokens: tokenId
          }
        },
      })

      blobStream.on('error', error => {
        console.log(error)
        _reject(error)
      })

      blobStream.on('finish', data => {

        const url = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(fileUpload.name)}?alt=media&token=${tokenId}`
        fileUpload.getSignedUrl({ action: 'read' })
        arrayFile.push({ url: url, type: file.mimetype, code: nameFile.toString() })

        if (arrayFile.length == (files.length))
          _resolve(arrayFile)

      })

      blobStream.end(file.buffer)

    })

  })

  return prom
}

export default {

  verificationController: async (req, res) => {
    try {
      const { imageUrl = 'https://upload.wikimedia.org/wikipedia/commons/3/37/Dagestani_man_and_woman.jpg' } = req.body;
      const response = await verificationFace.requestFace({ imageUrl });
      res.status(200).send(response);
    } catch (error) {
      console.log(error);
    }
  },

  AddFile: async (req, res) => {

    try {

      if (req.files.length > 0) {

        const response = await UploadStorageFirebase(req.files)
        return res.status(200).send(response)

      }

      return res.status(400).send({
        status: 'File required'
      })

    } catch (error) {
      return res.status(400).send({
        status: 'an error has ocurred'
      })
    }
  }
}

