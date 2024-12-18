import { inngest } from "./client";
import axios from 'axios';
import EmailService from "../service/email-service";
import archiver from 'archiver';
import stream from 'stream';
import fs from 'fs';


const emailService = new EmailService();
export const sendLogoThroughEmail = inngest.createFunction(
    {
      id: "sendLogoThroughEmail",

     
    },
    { event: "3dlogoai/sendLogoThroughEmail" },
    async ({ event, step }) => {
      const { imageUrl, fromEmail, emailSendTo } =
        event?.data;
   
        const newFromEmail = `3DLogoai <no.reply${fromEmail}>`
        
                let res = await step.run("sendEmail", async () =>{
                    try {
                        // Fetch the image from the URL
            const response = await axios.get(imageUrl, { responseType: 'stream' });
            const zipFilePath = './image.zip';

            // Create a writable stream for the ZIP file
            let bufferStream = new stream.PassThrough();
            const archive = archiver('zip', { zlib: { level: 9 } });

            archive.on('error', (err) => {
                throw err;
            });

            // Pipe archive data to the file
            archive.pipe(bufferStream);
            archive.append(response.data, { name: 'logo.png' });
            await archive.finalize();


            // Read the ZIP file as a Buffer
           // Collect the buffer from the ZIP file
            const zipBuffer = await new Promise((resolve, reject) => {
                const buffers = [];
                bufferStream.on('data', (chunk) => buffers.push(chunk));
                bufferStream.on('end', () => resolve(Buffer.concat(buffers)));
                bufferStream.on('error', reject);
            });

            await emailService.sendLogoThroughEmail(newFromEmail, emailSendTo, zipBuffer);
            } catch (error) {
                console.log(error);
                
            }
        })
        
        return true;
    }
  );
  