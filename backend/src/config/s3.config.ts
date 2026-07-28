import { S3Client } from "@aws-sdk/client-s3";
import * as dotenv from "dotenv" ;

dotenv.config();

const aws_region = process.env.AWS_REGION ?? "" ;
const aws_accessKeyId = process.env.AWS_ACCESS_KEY_ID ?? "" ;
const aws_secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY ?? ""
const aws_s3Bucket = process.env.AWS_SECRET_ACCESS_KEY ?? "" ;

export const s3Client = new S3Client( {

    region: aws_region,

    credentials: {
        accessKeyId: aws_accessKeyId ,
        secretAccessKey: aws_secretAccessKey
    }
} )

export const S3_BUCKET = aws_s3Bucket