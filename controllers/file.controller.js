'use strict'

import googleStorage from '@google-cloud/storage'
import shortid from 'shortid'
import config from '../config/config'
import fs from 'fs'

let tokenId = shortid.generate()

const storage = googleStorage(config.firebaseCredential)
const bucket = storage.bucket('gs://ia-semester.appspot.com')

const UploadStorageFirebase = (files, userId, mainFolder) => {

  let prom = new Promise((_resolve, _reject) => {

    let arrayFile = []

    if (files.length <= 0) {
      _reject('Not file')
    }

    files.map((file, i) => {

      let nameFile = `${Date.now()}${i}`
      let folderPath = `files/${userId}`
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

  AddFile: async (req, res) => {

    try {

      let data = {
        files: req.files,
        userId: req.body.userId,
        folderName: req.body.folderName
      }

      if (data.files.length > 0) {

        const response = await UploadStorageFirebase(data.files, data.userId, data.folderName)
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