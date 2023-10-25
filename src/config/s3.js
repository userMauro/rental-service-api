const multer  = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const { S3Client, PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

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

const multarMiddleware = (field) => {
    return (req, res, next) => {
        upload.single(field)(req, res, (err) => {
            if (err) {
                return res.status(400).json({ status: false, msg: 'Error al cargar el archivo' });
            }
            next();
        });
    };
};

async function uploadImage(file) {
    const params = {
        Bucket: AWS_BUCKET_NAME,
        Key: file?.barcode,
        Body: file?.buffer,
        ContentType: file?.mimetype 
    }
    const command = new PutObjectCommand(params)

    return await s3.send(command)
}

async function getImage(file) {
    const params = {
        Bucket: AWS_BUCKET_NAME,
        Key: file,
    }

    const command = new GetObjectCommand(params)
    const url = await getSignedUrl(s3, command, { expiresIn: 60 })  // 60 secs

    if (!url) { // a revisar: que devuelve la variable "url" y si ya es null, eliminar este condicional
        return null
    }

    return url
}

module.exports = { multarMiddleware, uploadImage, getImage }