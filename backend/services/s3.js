const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');

const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

const uploadToS3 = async (file) => {
    const params = {
        Bucket: process.env.AWS_S3_BUCKET,
        Key: `${Date.now()}.${file.originalname}`,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: 'public-read',
    };

    try {
        const command = new PutObjectCommand(params);
        const data = await s3Client.send(command);
        return `https://${params.Bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${params.Key}`;
    } catch (err) {
        console.error('Error uploading file:', err);
        throw new Error('Error uploading file to S3');
    }
};

module.exports = { uploadToS3 };