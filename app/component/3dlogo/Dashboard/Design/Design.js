'use client'
import Navigation from '@/app/component/Navigation/Navigation';
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import VerticalTabCategory from '../VerticalTabCategory';
import Draggable from 'react-draggable';

const Design = ({ imageList }) => {
    const [selectedImage, setSelectedImage] = useState(imageList[0]?.image_url);
    const [heading, setHeading] = useState("");
    const [fontSize, setFontSize] = useState(16);
    const [fontFamily, setFontFamily] = useState("Arial");
    const [color, setColor] = useState("#000000");
    const [showHeadingInput, setShowHeadingInput] = useState(false);
    const [textPosition, setTextPosition] = useState({ x: 0, y: 0 });
    const [borderWidth, setBorderWidth] = useState(0);
    const [borderColor, setBorderColor] = useState("");
    const [borderRadius, setBorderRadius] = useState(0);
    const imageRef = useRef(null);
    const canvasRef = useRef(null);

    const handleAddHeading = () => {
        setShowHeadingInput(true);
    };

    const handleDownloadImage = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
    
        if (!imageRef.current) return; // Ensure imageRef is valid
    
        // Set canvas size to match the image plus border
        canvas.width = imageRef.current.width + (borderWidth * 2);
        canvas.height = imageRef.current.height + (borderWidth * 2);
    
        // Clear the canvas before drawing
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    
        // Create a rounded rectangle path for the image
        ctx.beginPath();
        ctx.moveTo(borderWidth + borderRadius, borderWidth);
        ctx.lineTo(canvas.width - borderWidth - borderRadius, borderWidth);
        ctx.quadraticCurveTo(canvas.width - borderWidth, borderWidth, canvas.width - borderWidth, borderWidth + borderRadius);
        ctx.lineTo(canvas.width - borderWidth, canvas.height - borderWidth - borderRadius);
        ctx.quadraticCurveTo(canvas.width - borderWidth, canvas.height - borderWidth, canvas.width - borderWidth - borderRadius, canvas.height - borderWidth);
        ctx.lineTo(borderWidth + borderRadius, canvas.height - borderWidth);
        ctx.quadraticCurveTo(borderWidth, canvas.height - borderWidth, borderWidth, canvas.height - borderWidth - borderRadius);
        ctx.lineTo(borderWidth, borderWidth + borderRadius);
        ctx.quadraticCurveTo(borderWidth, borderWidth, borderWidth + borderRadius, borderWidth);
        ctx.closePath();
    
        // Clip to the rounded rectangle
        ctx.save();
        ctx.clip();
    
        // Draw the image on the canvas
        ctx.drawImage(imageRef.current, borderWidth, borderWidth, imageRef.current.width, imageRef.current.height);
    
        // Restore the context state
        ctx.restore();
    
        // Draw the border
        ctx.strokeStyle = borderColor;
        ctx.lineWidth = borderWidth;
        ctx.stroke();
    
        // Set font style for the text
        ctx.font = `${fontSize}px ${fontFamily}`;
        ctx.fillStyle = color;
        ctx.textBaseline = 'top'; // Align text from the top
    
        // Calculate text position to account for canvas border and scaling
        const adjustedTextPosition = {
            x: textPosition.x ,
            y: textPosition.y 
        };
        console.log(adjustedTextPosition);
        // Draw the heading text on the canvas
        ctx.fillText(heading, adjustedTextPosition.x, adjustedTextPosition.y);
    
        // Convert canvas to data URL
        const dataUrl = canvas.toDataURL('image/png');
    
        // Create a temporary link and trigger download
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'custom_image.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    
    
    
    
    const handleSelectImage = (val) => {
        setSelectedImage(val);
    }
   
    return (
        <div>
            <Navigation />
            <div className='flex flex-col md:flex-row w-full flex-1 md:overflow-hidden max-w-[2250px] mx-auto '>
                <div className='flex flex-col md:flex-row'>
                    <ul className="menu bg-base-200 rounded-box w-56 ">
                        <VerticalTabCategory />
                    </ul>
                    <div className="px-4 py-2 w-full md:w-64 h-96 md:h-[1000px] space-y-4 overflow-y-auto max-md:border-b md:border-r md:pb-20">
                        {imageList.map((val, index) => (
                            <Image 
                                key={index}
                                src={val?.image_url}
                                width={250}
                                height={250}
                                alt='logo'
                                className="cursor-pointer"
                                onClick={() => handleSelectImage(val?.image_url)}
                            />
                        ))}
                    </div>

                    <div className='design-image  relative flex md:w-[1200px] items-center justify-center' style={{
                        padding: `${borderWidth}px`,
                        background:"#F5F5F5"
                      
                    }}>
                        <div style={{
                            borderRadius: `${borderRadius}px`,
                       
                        }}>
                            <Image 
                                width={500}
                                height={500}
                                src={selectedImage}
                                alt='Selected image'
                                ref={imageRef}
                                onLoad={(e) => {
                                    if (canvasRef.current) {
                                        canvasRef.current.width = e.target.width;
                                        canvasRef.current.height = e.target.height;
                                    }
                                }}
                            />
                        </div>
                        {showHeadingInput && (
                            <Draggable
                                onStop={(e, data) => {
                                    setTextPosition({ x: data.x, y: data.y });
                                }}
                            >
                                <div className="cursor-move absolute">
                                    <input 
                                        type="text"
                                        value={heading}
                                        onChange={(e) => setHeading(e.target.value)}
                                        placeholder="Enter heading"
                                        autoFocus
                                        className="p-2 bg-transparent border-none outline-none"
                                        style={{ fontSize: `${fontSize}px`, fontFamily: fontFamily, color: color }}
                                    />
                                </div>
                            </Draggable>
                        )}
                        <canvas ref={canvasRef} style={{ display: 'none' }} />
                    </div>

                    <div className='design-vertical-tab p-4'>
                        <h3 className='text-lg font-bold mb-2'>Customize Heading</h3>
                        <div className='mb-4'>
                            <label className='block mb-2'>Font Size</label>
                            <input 
                                type="range" 
                                min="10" 
                                max="100" 
                                value={fontSize} 
                                onChange={(e) => setFontSize(e.target.value)} 
                                className="w-full"
                            />
                        </div>
                        <div className='mb-4'>
                            <label className='block mb-2'>Font Family</label>
                            <select 
                                value={fontFamily} 
                                onChange={(e) => setFontFamily(e.target.value)} 
                                className="w-full p-2 "
                            >
                                <option value="Arial">Arial</option>
                                <option value="Verdana">Verdana</option>
                                <option value="Times New Roman">Times New Roman</option>
                                <option value="Courier New">Courier New</option>
                                <option value="Georgia">Georgia</option>
                            </select>
                        </div>
                        <div className='mb-4'>
                            <label className='block mb-2'>Color</label>
                            <input 
                                type="color" 
                                value={color} 
                                onChange={(e) => setColor(e.target.value)} 
                                className="w-full"
                            />
                        </div>
                        <h3 className='text-lg font-bold mb-2'>Customize Border</h3>
                        {/* <div className='mb-4'>
                            <label className='block mb-2'>Border Width</label>
                            <input 
                                type="range" 
                                min="0" 
                                max="20" 
                                value={borderWidth} 
                                onChange={(e) => setBorderWidth(e.target.value)} 
                                className="w-full"
                            />
                        </div> */}
                        {/* <div className='mb-4'>
                            <label className='block mb-2'>Border Color</label>
                            <input 
                                type="color" 
                                value={borderColor} 
                                onChange={(e) => setBorderColor(e.target.value)} 
                                className="w-full"
                            />
                        </div> */}
                        <div className='mb-4'>
                            <label className='block mb-2'>Image Border Radius</label>
                            <input 
                                type="range" 
                                min="0" 
                                max="50" 
                                value={borderRadius} 
                                onChange={(e) => setBorderRadius(e.target.value)} 
                                className="w-full"
                            />
                        </div>
                        <div className='mb-4'>
                            <button 
                                onClick={handleAddHeading}
                                className="btn btn-primary text-white p-2 rounded mb-4 w-full"
                            >
                                Add Heading
                            </button>
                        </div>
                        <div className='mb-4'>
                            <button 
                                onClick={handleDownloadImage}
                                className="btn btn-secondary text-white p-2 rounded w-full"
                            >
                                Download Image
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Design;