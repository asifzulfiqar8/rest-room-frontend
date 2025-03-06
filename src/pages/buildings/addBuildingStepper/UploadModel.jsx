import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import BrowseFile from "../../../components/shared/BorowseFile";

const UploadModel = ({ setFile, imagePreview, setImagePreview }) => {
  const deleteButtonHandler = () => setImagePreview(null);
  return (
    <div>
      <div className="flex justify-end">
        <div className="cursor-pointer" onClick={deleteButtonHandler}>
          <MdDelete className="text-red-600" fontSize={20} />
        </div>
      </div>
      <div className="mt-1">
        <BrowseFile
          setFile={setFile}
          imagePreview={imagePreview}
          setImagePreview={setImagePreview}
        />
      </div>
    </div>
  );
};

export default UploadModel;
