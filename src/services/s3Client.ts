import AWS from 'aws-sdk';
const REGION = "eu-central-1";
/**
 * @TODO This will be responsilbe for setting up the connection to the IBKM-S3-BUCKET where we will store Graphimages
 */

// Create an Amazon S3 service client object.
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

const s3Client = new AWS.S3({ region: REGION });
export { s3Client };