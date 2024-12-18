"use client";
import React from "react";
import NextImage from "next/image";
import axios from "axios";
import { saveAs } from "file-saver";


const ImageWithDownload = ({ handleClick, index, data, isSub, industry }) => {
  const downloadImage = async (e, image_url, index, isSub) => {
    e.stopPropagation();
    try {
      const response = await axios.get(image_url, {
        responseType: "blob",
      });
      const blob = response.data;
      const fileExtension = image_url.split(".").pop();
  
      if (isSub) {
        saveAs(blob, `image${index + 1}.png`);
      } else {
        const img = new window.Image();
        const url = URL.createObjectURL(blob);
        img.src = url;
  
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
  
         // Add watermark text
    const watermarkText = `3D Logo ai`;
    ctx.font = "100px Arial";
    ctx.fillStyle = "rgba(255, 255, 255, 0.8)"; // Light white with 80% opacity

    // Text shadow settings
    ctx.shadowColor = "rgba(0, 0, 0, 0.5)"; // Black shadow with 50% opacity
    ctx.shadowOffsetX = 2; // Horizontal offset of the shadow
    ctx.shadowOffsetY = 2; // Vertical offset of the shadow
    ctx.shadowBlur = 4; // Blur radius of the shadow

    
        ctx.textAlign = "center"; // Center text horizontally
    ctx.textBaseline = "middle"; // Center text vertically

    // Calculate text position
    const textWidth = ctx.measureText(watermarkText).width;
    const x = canvas.width / 2;
    const y = canvas.height / 2;
          ctx.fillText(watermarkText, x, y);
  
          canvas.toBlob((watermarkedBlob) => {
            saveAs(watermarkedBlob, `image${index + 1}.png`);
          }, `image/${fileExtension}`);
        };
      }
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };


  return (
    <div key={index} 
    onClick={(e) => handleClick(e, data.image_url, industry)}
    className="relative group cursor-pointer" >
      <NextImage
        key={index}
        width={300}
        height={300}
        src={data.image_url}
        alt="logo"
        className="rounded-md"
      />
      <NextImage
        onClick={(e) => downloadImage(e, data.image_url, index, isSub)}
        width={25}
        height={25}
        src="/image/download.svg"
        className="cursor-pointer hover:bg-indigo-600 text-white 
        bg-white absolute top-0 right-0"
      />
    </div>
  );
};

export default ImageWithDownload;
