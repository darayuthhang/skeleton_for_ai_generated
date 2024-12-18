"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { DEFAULT_LOGO } from "@/app/lib/3d-logo-constant";
import { getInngest } from "./DashboardApi";
import JSZip from "jszip";
import axios from "axios";
import { saveAs } from "file-saver";
import ImageWithDownload from "./ImageWithDownload";
import MyDropDown from "./Dropdown";
// import { getRunInngest } from "./DashboardApi";

const DefaultLogoList = ({ inngestId, userId, isSub }) => {
  const [data, setData] = useState(DEFAULT_LOGO);
  const [ImageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      if (inngestId) {
        const ifFailRetry = async () => {
          const eventId = inngestId;
          let res = await getInngest(eventId, userId);
          let runs = res?.data;

          while (runs[0].status !== "Completed") {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            const resTwo = await getInngest(eventId, userId);
            runs = resTwo?.data;
            if (runs[0].status === "Failed" || runs[0].status === "Cancelled") {
              throw new Error(`Function run ${runs[0].status}`);
            }
          }
          return runs[0];
        };
        try {
          let res = await ifFailRetry();
          
          
          
          if (res?.output && res?.output?.length > 0) {
            document.getElementById("loading_modal").close();

            setData(res?.output.map(item => ({ image_url: item.image_url })));
            
            setImageUrl(res?.output[0]?.image_url);
          }
        } catch (error) {
          document.getElementById("loading_modal").close();
        }
      }
    };
    fetch();
  }, [inngestId]);

//   const downloadImagesAsZip = async (e) => {
//     setLoading(true);

//     const zip = new JSZip();
//     const imageFolder = zip.folder("images");

//     try {
//         console.log(data);
//         // Fetch images and add them to the zip
//         // Fetch images and add them to the zip
//         const imagePromises = data.map(async (image, index) => {
//             const response = await axios.get(image.image_url, {
//                 responseType: "arraybuffer",
//             });
//             const fileExtension = image.image_url.split(".").pop();
//             const base64Data = Buffer.from(response.data, 'binary').toString('base64');
//             imageFolder.file(`image${index + 1}.${fileExtension}`, base64Data, {base64: true});
//         });

//         await Promise.all(imagePromises);
   
//         // Generate zip and save it
//         const zipBlob = await zip.generateAsync({ type: "blob" });
//         saveAs(zipBlob, "images.zip");
//     } catch (error) {
//         console.error("Error downloading images:", error);
//     } finally {
//         setLoading(false);
//     }
// };
  //useEffect to fetch data from inngest

  return (
    <div>
      {/* <div className="flex justify-end">
      <MyDropDown
        imageUrl={ImageUrl}
        userId={userId}
      />
      </div> */}
     
       <div className="  p-4 grid grid-cols-1 md:grid-cols-2  
    gap-2 justify-center  ">
    
   
      {data.map((image, index) => (
        <ImageWithDownload 
            index={index}
            data={image}
            isSub={isSub}
        />
      ))}
    </div>
    </div>
   
  );
};
export default DefaultLogoList;
