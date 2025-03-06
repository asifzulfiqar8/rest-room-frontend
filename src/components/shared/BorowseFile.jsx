/* eslint-disable react/prop-types */
import { useState } from "react";
import { BsImages } from "react-icons/bs";

const BrowseFile = ({ setFile, imagePreview, setImagePreview }) => {
  const [dragActive, setDragActive] = useState(false);

  // Handle file conversion and preview
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      convertToBase64(selectedFile);
    }
  };

  // Handle drag over event
  const handleDragOver = (event) => {
    event.preventDefault();
    setDragActive(true);
  };

  // Handle drop event
  const handleDrop = (event) => {
    event.preventDefault();
    setDragActive(false);
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      convertToBase64(droppedFile);
    }
  };

  // Convert file to Base64 and preview
  const convertToBase64 = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      // setFile(reader.result);
      setImagePreview(reader.result); // Set preview in UI
    };
  };

  return (
    <div
      className={`mt-3 border border-dashed rounded-lg p-4 h-[200px] md:h-[290px] grid place-items-center relative ${
        dragActive
          ? "border-blue-400 bg-blue-100"
          : "border-blue-300 bg-blue-50"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={() => setDragActive(false)}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center gap-2">
        {imagePreview ? (
          <img
            src={imagePreview}
            alt="Uploaded preview"
            className="w-full h-[165px] md:h-[250px] object-cover rounded-lg"
          />
        ) : (
          <>
            <BsImages className="text-gray-500 text-4xl" />
            <p className="text-gray-600 text-sm font-semibold">
              Drag and Drop Files here
            </p>
            <p className="text-gray-600 text-sm font-semibold">Or</p>
            <BrowseFileBtn onFileChange={handleFileChange} />
          </>
        )}
      </div>
    </div>
  );
};

export default BrowseFile;

// File Upload Button
const BrowseFileBtn = ({ onFileChange }) => {
  return (
    <button className="relative px-4 py-2 cursor-pointer rounded-lg bg-primary text-white font-semibold">
      Browse File
      <input
        type="file"
        className="absolute inset-0 cursor-pointer opacity-0"
        onChange={onFileChange}
      />
    </button>
  );
};
