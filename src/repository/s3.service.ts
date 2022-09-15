require('dotenv').config()
import AWS from 'aws-sdk';

export class S3Service {

    private static bucketName = process.env.BUCKET_NAME;
    private static s3 = new AWS.S3({
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRET_ACCESS_KEY,
        signatureVersion: process.env.SIGNATURE_VERSION,
        region: process.env.REGION 
    }); 

    static async getPutUrl(key: string): Promise<string> {
        return await S3Service.url(key, 'putObject');
    }

    static async getUrl(key: string): Promise<string> {
        return await S3Service.url(key, 'getObject');
    }

    private static async url(key: string, type: string) {
        return await this.s3.getSignedUrlPromise(type, {
           Bucket: S3Service.bucketName,
           Key: key,
           Expires: 60 * 30,
        });
    }

}