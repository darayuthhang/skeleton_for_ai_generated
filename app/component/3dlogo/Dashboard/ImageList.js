"use client";
import React, { useState, useEffect } from "react";
import useFetch from "@/app/lib/axios/useFetch";
import SkeletonLoading from "../../SkeletonLoading/SkeletonLoading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ImageWithDownload from "./ImageWithDownload";
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import axios from "axios";
import { useRouter } from 'next/navigation';


const ImageList = ({ userId, isSub }) => {
  const [page, setPage] = useState(1);
  const [imageList, setImageList] = useState([]);
  const [loadingMore, setLoadingMore] = useState(false);
  const [loadingBulk, setloadingBulk] = useState(false); // State to manage loading
  const router = useRouter();
  const limit = 12;
  const keyUrl2 = `/v1/${userId}/dashboard/imageList?page=${page}&limit=${limit}`;

  const { data, error, isLoading, mutate } = useFetch(keyUrl2);
  
  const imageData = data?.allImages;
  
  useEffect(() => {
    if (data?.data) {
      setImageList(prevImageList => [...prevImageList, ...data.data]);
      setLoadingMore(false);
    }
  }, [data]);

  const downloadImagesAsZip = async () => {
    setloadingBulk(true); // Start loading
    const zip = new JSZip();

    try {
        // Fetch all images and add them to the zip
        const imagePromises = imageData.map(async (item, index) => {
            const response = await axios.get(item.image_url, { responseType: 'blob' });
            const filename = `image-${index + 1}.jpg`;
            zip.file(filename, response.data, { binary: true });
        });

        // Wait for all images to be fetched
        await Promise.all(imagePromises);

        // Generate the zip file
        const content = await zip.generateAsync({ type: 'blob' });
        saveAs(content, 'images.zip');
    } catch (error) {
        console.error('Error downloading images:', error);
    } finally {
      setloadingBulk(false); // End loading
    }
};

  const loadMore = () => {
    setLoadingMore(true);
    setPage(prevPage => prevPage + 1);
  };
  const handleClick = (e, value, industry) => {
    router.push(`/3dlogo/dashboard?url=${value}&industry=${industry}`);
  };
  return (
    <div>
      <ToastContainer />
      

      {isLoading && page === 1 ? (
        <SkeletonLoading />
      ) : (
        
        <div className="flex items-center flex-col">
         

         {isSub && <button 
          className={`btn btn-sm btn-secondary ${loadingBulk && "btn-disabled"} `}
          onClick={downloadImagesAsZip}
          read
         >
          {loadingBulk ? "Loading" : "Download in bulk"}
          </button>
        }

          <div className="p-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-2 justify-center">
            
            {imageList.map((val, index) => (
              <ImageWithDownload key={index} handleClick={handleClick} index={index} industry={val?.industry} data={val} isSub={isSub}  />
            ))}
          </div>
          {loadingMore && <SkeletonLoading />}
          {!loadingMore && data?.data?.length >= limit && (
            <button onClick={loadMore} className="btn btn-secondary text-center border">
              Load More...
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageList;
