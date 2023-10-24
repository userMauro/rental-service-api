// MULTER
const multer  = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
// MULTER

const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3')

const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME
const AWS_BUCKET_REGION = process.env.AWS_BUCKET_REGION
const AWS_PUBLIC_KEY = process.env.AWS_PUBLIC_KEY
const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY



const s3 = new S3Client({
    region: AWS_BUCKET_REGION,
    credentials: {
        accessKeyId: AWS_PUBLIC_KEY,
        secretAccessKey: AWS_SECRET_KEY
    }
})

// min 54
async function uploadFile(file) {
    const params = {
        Bucket: AWS_BUCKET_NAME,
        Key: "nombre_del_archivo",
        Body: file?.buffer  // multer guarda la foto en memoria en file.buffer
    }
    const command = new PutObjectCommand(params)

    return await s3.send(command)
}

module.exports = { uploadFile }