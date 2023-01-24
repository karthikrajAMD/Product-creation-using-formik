import React from "react";
import "../product.css";
const PreviewImage = ({ file, width, height }) => {
  return (
    <div className="text-center">
      <img src={file} alt="Preview" width={width} height={height} />
    </div>
  );
};

export default PreviewImage;
