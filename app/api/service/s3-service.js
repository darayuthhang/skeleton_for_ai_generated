import { S3ServiceError } from "@/app/lib/error-handler/app-errors";
import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from 'uuid'; // Import the UUID generator
import sharp from "sharp";
import constants from "@/app/lib/constants";
import axios from "axios";


const accessKeyAws = process.env.S3_ACCESS_KEY
const secretKeyAws = process.env.S3_SECRET_ACCESS_KEY
const regionAws = process.env.S3_REGION
const bucketNameAws = process.env.S3_BUCKET_NAME
const folder = constants.folder;

 function convertFilePath(url) {
    if(url){
        const pathname = new URL(url).pathname;
        const filePath = pathname.substring(1);
        return `${filePath}`
    }
    return null;
}

class S3Service{
    constructor(accessKey = accessKeyAws, secretKey = secretKeyAws, region = regionAws){
        this.s3Client = new S3Client({
            region: region,
            credentials: {
                accessKeyId: accessKey,
                secretAccessKey: secretKey,
            }
        });
        this.bucketName = bucketNameAws
    };
    async  uploadFileToS3(uniqueFilename,resizedImageBuffer) {
        try {
            
            // const uniqueFilename = `${Date.now()}-${uuidv4()}-${fileName}`;
      

            const key = `${folder}/${uniqueFilename}`
          
            const params = {
                Bucket: this.bucketName,
                Key: key,
                Body: resizedImageBuffer,
                ContentType: "image/png"
            }
            const command = new PutObjectCommand(params);
            await this.s3Client.send(command);
     
            return uniqueFilename;

        } catch (error) {
            console.log(error);
            //error, status code 400 (upload error)
            throw new S3Service(error, 400);
        }
    
    }
    async  uploadFileFreeFolders3WithBuffer(resizedImageBuffer) {
        try {
            
            const uniqueFilename = `${Date.now()}-${uuidv4()}`;
            const newFolder = "free"

            const key = `${newFolder}/${uniqueFilename}`
          
            const params = {
                Bucket: this.bucketName,
                Key: key,
                Body: resizedImageBuffer,
                ContentType: "image/png"
            }
            const command = new PutObjectCommand(params);
            await this.s3Client.send(command);
     
            return uniqueFilename;

        } catch (error) {
            console.log(error);
            //error, status code 400 (upload error)
            throw new S3Service(error, 400);
        }
    
    }
    async  uploadFileToS3WithUrl(url) {
        try {

            const uniqueFilename = `${Date.now()}-${uuidv4()}`;
            const response = await axios.get(url, { responseType: 'arraybuffer' });
            const fileBuffer = response.data;
            const contentType = response.headers['content-type'];

            const key = `${folder}/${uniqueFilename}`
          
            const params = {
                Bucket: this.bucketName,
                Key: key,
                Body: fileBuffer,
                ContentType: "image/png"
            }
            const command = new PutObjectCommand(params);
            await this.s3Client.send(command);
     
            return uniqueFilename;

        } catch (error) {
            console.log(error);
            //error, status code 400 (upload error)
            throw new S3Service(error, 400);
        }
    
    }

    async  uploadFileToS3WithBuffer(resizedImageBuffer) {
        try {
            
            const uniqueFilename = `${Date.now()}-${uuidv4()}`;
      

            const key = `${folder}/${uniqueFilename}`
          
            const params = {
                Bucket: this.bucketName,
                Key: key,
                Body: resizedImageBuffer,
                ContentType: "image/png"
            }
            const command = new PutObjectCommand(params);
            await this.s3Client.send(command);
     
            return uniqueFilename;

        } catch (error) {
            console.log(error);
            //error, status code 400 (upload error)
            throw new S3Service(error, 400);
        }
    
    }

    // async deleteObjectFromS3( folder, key) {
    //     try {
    //         const params = {
    //             Bucket: this.bucketName,
    //             Key: convertFilePath(key)
    //         };
          
    //         const deleteCommand = new DeleteObjectCommand(params);
        
    //         const response = await this.s3Client.send(deleteCommand);
            
    //         return true;
           
    //     } catch (error) {
    //         throw new S3Service(error, 400);
         
    //     }
    // }
    
}
export default S3Service;
