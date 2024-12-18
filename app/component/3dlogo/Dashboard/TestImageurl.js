'use client';
import { useEffect, useRef, useState } from 'react';

const DraggableTextImage = () => {
  const canvasRef = useRef(null);
  const imgRef = useRef(null); // Ref to store the loaded image
  const [textPosition, setTextPosition] = useState({ x: 200, y: 250 }); // Centered by default
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [rotationAngle, setRotationAngle] = useState(0); // Rotation angle in degrees
  const [fontSize, setFontSize] = useState(30); // Font size in pixels
  const [fontColor, setFontColor] = useState('#FFFFFF'); // Default color white
  const [fontFamily, setFontFamily] = useState('Arial'); // Default font family

  // Load the image once on component mount
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = 800;
      canvas.height = 500;

      const ctx = canvas.getContext('2d');

      imgRef.current = new Image();
      imgRef.current.crossOrigin = 'anonymous'; // Enable CORS
      imgRef.current.src = 'https://picsum.photos/800/500'; // Image with proper CORS headers

      imgRef.current.onload = () => {
        ctx.drawImage(imgRef.current, 0, 0, canvas.width, canvas.height); // Draw the background image
        drawText(ctx); // Draw initial text
      };

      imgRef.current.onerror = (err) => {
        console.error('Image failed to load:', err);
      };
    }
  }, []);

  // Redraw the canvas whenever the text position, rotation, font size, font color, or font family changes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas && imgRef.current && imgRef.current.complete) {
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(imgRef.current, 0, 0, canvas.width, canvas.height); // Redraw background image
      drawText(ctx); // Redraw text at new position
    }
  }, [textPosition, rotationAngle, fontSize, fontColor, fontFamily]);

  // Function to draw text at the current position with rotation, font size, font color, and font family
  const drawText = (ctx) => {
    ctx.save();
    ctx.translate(textPosition.x, textPosition.y); // Move to text position
    ctx.rotate((rotationAngle * Math.PI) / 180); // Rotate context
    ctx.font = `${fontSize}px ${fontFamily}`;
    ctx.fillStyle = fontColor;
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.fillText('Drag me!', 0, 0); // Draw text at the origin (after transform)
    ctx.restore();
  };

  // Handle mouse down event (start drag)
  const handleMouseDown = (e) => {
    const canvas = canvasRef.current;
    if (canvas) {
      const mouseX = e.nativeEvent.offsetX;
      const mouseY = e.nativeEvent.offsetY;

      const ctx = canvas.getContext('2d');
      ctx.save();
      ctx.translate(textPosition.x, textPosition.y);
      ctx.rotate((rotationAngle * Math.PI) / 180);
      ctx.font = `${fontSize}px ${fontFamily}`;
      const text = 'Drag me!';
      const metrics = ctx.measureText(text);
      const textWidth = metrics.width;
      const textHeight =
        metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

      // Transform mouse coordinates into the coordinate system of the rotated text
      const dx = mouseX - textPosition.x;
      const dy = mouseY - textPosition.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const angle = Math.atan2(dy, dx) - (rotationAngle * Math.PI) / 180;
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;

      // Check if the click is within the bounds of the text
      if (
        x >= -textWidth / 2 &&
        x <= textWidth / 2 &&
        y >= -textHeight / 2 &&
        y <= textHeight / 2
      ) {
        setIsDragging(true);
        setDragOffset({
          x: mouseX - textPosition.x,
          y: mouseY - textPosition.y,
        });
      }
      ctx.restore();
    }
  };

  // Handle mouse move event (dragging)
  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const mouseX = e.nativeEvent.offsetX;
    const mouseY = e.nativeEvent.offsetY;

    // Update text position based on drag offset
    setTextPosition({
      x: mouseX - dragOffset.x,
      y: mouseY - dragOffset.y,
    });
  };

  // Handle mouse up event (end drag)
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Download canvas as an image
  const downloadImage = () => {
    const canvas = canvasRef.current;
    if (canvas && imgRef.current && imgRef.current.complete) {
      const ctx = canvas.getContext('2d');

      // Redraw everything to ensure the latest state is saved
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(imgRef.current, 0, 0, canvas.width, canvas.height);
      drawText(ctx);

      const dataURL = canvas.toDataURL('image/png'); // Generate the data URL

      const link = document.createElement('a');
      link.href = dataURL;
      link.download = 'canvas-image.png'; // Set the filename for download
      link.click();
    } else {
      console.error('Canvas or image is not ready for downloading.');
    }
  };

  return (
    <div className="bg-black p-4">
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        style={{ border: '1px solid black' }}
      />

      <div className="flex flex-col space-y-4 mt-4">
        {/* Slider for Rotation */}
        <div>
          <label className="label">
            <span className="label-text text-white">Rotation: {rotationAngle}°</span>
          </label>
          <input
            type="range"
            min="0"
            max="360"
            value={rotationAngle}
            onChange={(e) => setRotationAngle(Number(e.target.value))}
            className="range range-primary"
          />
        </div>

        {/* Slider for Font Size */}
        <div>
          <label className="label">
            <span className="label-text text-white">Font Size: {fontSize}px</span>
          </label>
          <input
            type="range"
            min="10"
            max="100"
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
            className="range range-primary"
          />
        </div>

        {/* Color Picker for Font Color */}
        <div>
          <label className="label">
            <span className="label-text text-white">Font Color:</span>
          </label>
          <input
            type="color"
            value={fontColor}
            onChange={(e) => setFontColor(e.target.value)}
            className="w-full"
          />
        </div>

        {/* Select for Font Family */}
        <div>
          <label className="label">
            <span className="label-text text-white">Font Family:</span>
          </label>
          <select
            value={fontFamily}
            onChange={(e) => setFontFamily(e.target.value)}
            className="select select-primary w-full"
          >
            <option value="Arial">Arial</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Courier New">Courier New</option>
            <option value="Verdana">Verdana</option>
            <option value="Georgia">Georgia</option>
            <option value="Tahoma">Tahoma</option>
            <option value="Impact">Impact</option>
            <option value="Comic Sans MS">Comic Sans MS</option>
          </select>
        </div>

        <button
          onClick={downloadImage}
          className="btn btn-primary mt-4"
        >
          Download Image
        </button>
      </div>
    </div>
  );
};

export default DraggableTextImage;