import React, { useState } from "react";

const ImageUpload = ({ label, onImageChange,value }) => {
  const [image, setImage] = useState(null);
  const [, setError] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    // Check if the selected file is a JPEG image
    if (file && file.type !== "image/jpeg") {
      setError("Please select a JPEG image (jpg).");
      setImage(null);
      onImageChange(null);
      return;
    }

    // Check the size of the image
    if (file && file.size > 300 * 1024) {
      setError("Image size should not exceed 300KB.");
      setImage(null);
      onImageChange(null);
      return;
    }

    setError(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target.result);
      onImageChange(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="image-container">
       <label required>{label}</label>
      <input type="file" value={value} accept=".jpg" onChange={handleImageChange}  className="custom-file-input" />
      {image && <img src={image} alt="Uploaded" style={{ maxWidth: "200px" }} />}
    </div>
  );
};

export default ImageUpload;
