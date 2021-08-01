'use strict';
const {awsS3} = require('../../DAO/aws-config/aws-s3');
const {S3params} = require('../generate-resources/create-s3-bucket')
const {
  createRecordInS3urlPathTable,
  getAllFilesDAO,
  getFileByIdDAO,
  getS3ObjectDAO} = require('../../DAO/file/file-dao');
const fs = require('fs')
const stream = require('stream');
const { v4: uuidv4 } = require('uuid');
const parser = require('lambda-multipart-parser');


/**
 * Deletes a file
 *
 * fileID UUID file id to delete
 * no response value expected for this operation
 **/
const deleteFile = (fileID) => {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Find a file by ID
 * Returns a single file 
 *
 * fileID UUID ID of a file
 * returns File
 **/
const getFileByIdHandler = async (event) => {
  const fileId = req.params.fileID
  getFileByIdDAO(fileId).then(data => {
    res.send(JSON.stringify(data))
  })
}


/**
 * Add a new file to the dynamoDB, then upload to S3
 *
 * body File 
 * no response value expected for this operation
 **/
const uploadFileHandler = async (event) => {
    const data = await parser.parse(event);
  const file = data.files[0]
  console.log(file)
  const promise = uploadToS3(file)
  await promise.then(
    data => createRecordInS3urlPathTable({
      path : data.Location,
      key: data.Key,
      bucketName: data.Bucket,
      fileName: file.fileName
    })
  ).catch(err => {
    console.log(err)
    return {
        statusCode: 500
    }
  });
  return {
      statusCode: 200,
      body: JSON.stringify({message: "upload succeeded"})
  }
}

// ============== S3 bucket interaction =================
const loadS3FileHandler = async (event) => {
    console.log(event)
    const fileId = req.params.fileID
    const stream = getS3ObjectDAO(fileId)
    stream.pipe(res)
}


const uploadToS3 = (file) => {
  const pass = new stream.PassThrough();
  const uploadStream = ({ Bucket, Key }) => {
    return {
      writeStream: pass,
      promise: awsS3.upload({ Bucket, Key, Body: pass }).promise(),
    };
  }
  const { writeStream, promise } = uploadStream({Bucket: S3params.Bucket, Key: uuidv4()});
  const readStream = fs.createReadStream(file.path);
  readStream.pipe(writeStream);
  return promise
}

//============ the following functions not added to YAML ===========

const getAllfilesHandler = async (event) => {
    const responseBody = {}
    await getAllFilesDAO().then(data => {
        responseBody.body = JSON.stringify(data)
    })

    return {
        statusCode: 200,
        body: responseBody.body
    }
}

module.exports = {
  deleteFile,
  getFileByIdHandler,
  uploadFileHandler,
  getAllfilesHandler,
  loadS3FileHandler
}

