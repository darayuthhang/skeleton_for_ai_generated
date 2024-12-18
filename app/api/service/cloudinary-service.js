import { db } from "@/app/lib/db";
import { v2 as cloudinary } from "cloudinary";
import { v4 as uuidv4 } from "uuid";

class CloudinaryService {
  constructor() {
    this.cloudinary = cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }
  async  upload(imageUrl) {
    // Generate a unique public_id
    const customPublicId = uuidv4();
  
    try {
      // Upload the image
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload(
          imageUrl,
          {
            public_id: customPublicId,
            folder: "uploads" // Optional: specify a folder
          },
          function (error, result) {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        );
      });
  
      const public_id = result.public_id;
      const secure_url = result.secure_url;
  
      // Generate the EPS URL
      const epsUrl = cloudinary.url(public_id, {
        format: "eps",
        secure: true,
        sign_url: true
      });
  
      // Generate the SVG URL with transformation
      const svgUrl = cloudinary.url(public_id, {
        transformation: [
          { width: 1024, height: 1024, crop: "limit" },
        {effect: 'vectorize:colors:5:detail:1.0:despeckle:1'}

        ],
        format: "svg",
        secure: true,
        sign_url: true
      });
      //free acount wont allow to convert image url to pdf
      // Generate the EPS URL
    //   const pdfUrl = cloudinary.url(public_id, {
    //     format: "pdf",
    //     secure: true,
    //     sign_url: true,
    //     transformation: [
    //         { quality: "auto" },   // Optional: improve file quality
    //       ]
    //   });
    //   console.log(pdfUrl);
      
      return [
        epsUrl,
        svgUrl,
        secure_url,
        
      ];
  
    } catch (error) {
      console.error("Error uploading:", error);
      throw error; // Propagate error for handling upstream
    }
  }
  async getImgFormat(publicId) {}
}
export default CloudinaryService;
