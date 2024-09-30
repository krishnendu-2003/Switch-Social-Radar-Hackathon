const multer = require('multer');
const multerS3 = require('multer-s3');
const { S3Client } = require('@aws-sdk/client-s3');

// Initialize the S3 client
const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

// Multer configuration for 'post/' folder
const upload = multer({
    storage: multerS3({
        s3: s3Client,
        bucket: process.env.AWS_S3_BUCKET,
        metadata: (req, file, cb) => {
            cb(null, { fieldName: file.fieldname });
        },
        key: (req, file, cb) => {
            // Store file in the 'post/' folder within the S3 bucket
            cb(null, `post/${Date.now().toString()}-${file.originalname}`);
        },
    }),
});

// Multer configuration for 'stories/' folder
const uploadStories = multer({
    storage: multerS3({
        s3: s3Client,
        bucket: process.env.AWS_S3_BUCKET,
        metadata: (req, file, cb) => {
            cb(null, { fieldName: file.fieldname });
        },
        key: (req, file, cb) => {
            // Store file in the 'stories/' folder within the S3 bucket
            cb(null, `stories/${Date.now().toString()}-${file.originalname}`);
        },
    }),
});

// Export both upload instances
module.exports = {
    upload,
    uploadStories,
};
