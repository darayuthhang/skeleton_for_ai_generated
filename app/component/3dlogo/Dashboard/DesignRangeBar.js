'use client'
import React from 'react';
const DesignRangeBar = ({heading, handleChange, val}) => {
return (
<>
<label>{heading}</label>
            <input
             
              type="range"
              min={10} // Set the minimum font size
              max={100} // Set the maximum font size
              value={val} // Bind the font size to the state
              onChange={handleChange} // Handle the change event
              className="range" // Optional styling class
            />
</>
);
}
export default DesignRangeBar;