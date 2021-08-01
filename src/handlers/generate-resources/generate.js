
const {createS3Table} = require('./create-dynamo-s3-path')
const {createBucket} = require('./create-s3-bucket')
/**
 * generate all necessary DB, S3, dynamoDB
 */
 const generateResourceHandler = async (event) => {

    createS3Table()
    createBucket()
    return {
        statusCode: 200
    };
}

module.exports = {
    generateResourceHandler
}
