import React from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  ChevronDownIcon,
  PencilIcon,
} from "@heroicons/react/16/solid";
import { getImageListUrlForDownload } from "./DashboardApi";
import { PDFDocument } from "pdf-lib";

export default function MyDropDown({ imageUrl, userId }) {
  const createPdfFromImage = async (imageUrl) => {
    try {
      const response = await fetch(imageUrl);
      const imageBuffer = await response.arrayBuffer();
      
      const pdfDoc = await PDFDocument.create();
      const image = await pdfDoc.embedPng(imageBuffer); // Use embedJpg for JPG images

      const { width, height } = image.scale(1);
      const page = pdfDoc.addPage([width, height]);
      page.drawImage(image, {
        x: 0,
        y: 0,
        width: width,
        height: height,
      });

      const pdfBytes = await pdfDoc.save();
      return new Blob([pdfBytes], { type: "application/pdf" });
    } catch (error) {
      console.error("Error creating PDF:", error);
    }
  };

  const downloadFilesAsZip = async () => {
    if(!imageUrl){ 
        toast.error("Please generate logo before you can download it", { autoClose: 2000 });


         return ;}
    const zip = new JSZip();

    try {
      document.getElementById("loading_modal").showModal();

      let res = await getImageListUrlForDownload({ imageUrl }, userId);
      
      if (res && res?.imageList?.length > 0) {
        const filePromises = res?.imageList.map((url) =>
          fetch(url).then((response) => response.blob())
        );

        // Fetch and create PDF
        const pdfBlob = await createPdfFromImage(imageUrl);

        // Wait for all files to be fetched
        const [epsBlob, svgBlob, pngBlob] = await Promise.all(filePromises);
        
        // Add files to the ZIP
        zip.file("logo.eps", epsBlob);
        zip.file("logo.svg", svgBlob);
        zip.file("logo.png", pngBlob);
        zip.file("logo.pdf", pdfBlob);  // Add PDF to ZIP

        // Generate the ZIP file and trigger download
        zip.generateAsync({ type: "blob" }).then((content) => {
          saveAs(content, "images.zip");
        });
        document.getElementById("loading_modal").close();
      }
    } catch (error) {
      document.getElementById("loading_modal").close();
    }
  };

  return (
    <div className="">
        <ToastContainer />
      <Menu >
        <MenuButton className={`inline-flex items-center gap-2 rounded-md bg-gray-800 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-700 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white`}>
          Download
          <ChevronDownIcon className="size-4 fill-white/60" />
        </MenuButton>

        <MenuItems transition anchor="bottom" className="btn btn-sm">
          <MenuItem>
            <button
              className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 cursor-pointer"
              onClick={downloadFilesAsZip}
               //true disable , false not disable
            >
              <PencilIcon className="size-4" />
               All file formats  in zip
            </button>
          </MenuItem>
        </MenuItems>
      </Menu>
    </div>
  );
}
