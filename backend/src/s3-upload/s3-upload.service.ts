import { PutObjectCommand } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { S3_BUCKET, s3Client } from 'src/config/s3.config';

@Injectable()
export class S3UploadService {

    async uploadFile( file : Express.Multer.File, folder : string, entityId? : number ) : Promise<string> {

        const prefix = entityId ?? Date.now() ;

        const key = `${folder}/${prefix}-${Date.now()}.${file.mimetype.split('/')[1]}` ;


        await s3Client.send( new PutObjectCommand( {

            Bucket: S3_BUCKET ,

            Key: key,

            Body: file.buffer,

            ContentType: file.mimetype

        } ) )


        return `https://${S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`

    }

}
