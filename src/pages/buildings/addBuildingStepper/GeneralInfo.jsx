import React, { useEffect, useState } from "react";
import Button from "../../../components/shared/button/Button";
import UploadModel from "./UploadModel";
import Input from "../../../components/shared/input/Input";
import { useDispatch, useSelector } from "react-redux";
import { setBuilding } from "../../../services/building/buildingSlice";

const GeneralInfo = ({ setCurrentStep }) => {
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [buildingInfo, setBuildingInfo] = useState({
    buildingName: "",
    buildingType: "",
    buildingImage: imagePreview,
    location: "",
    area: "",
    totalFloors: "",
    totalRestrooms: "",
    buildingManager: "",
    phone: "",
  });
  const { buildingData } = useSelector((state) => state.building);

  console.log("building", imagePreview);

  const buildingInfoChangeHandler = (e) => {
    const { name, value } = e.target;
    setBuildingInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const nextBtnHandler = () => {
    console.log("buildinginfo", buildingInfo);
    setCurrentStep((prevStep) => prevStep + 1);
    dispatch(setBuilding(buildingInfo));
  };

  useEffect(() => {
    if (
      buildingData?.buildingName ||
      buildingData?.buildingImage ||
      buildingData?.buildingType ||
      buildingData?.location ||
      buildingData?.area ||
      buildingData?.totalFloors ||
      buildingData?.totalRestrooms ||
      buildingData?.buildingManager ||
      buildingData?.phone
    ) {
      setBuildingInfo({
        ...buildingInfo,
        buildingName: buildingData.buildingName,
        buildingImage: buildingData.buildingImage,
        buildingType: buildingData.buildingType,
        location: buildingData.location,
        area: buildingData.area,
        totalFloors: buildingData.totalFloors,
        totalRestrooms: buildingData.totalRestrooms,
        buildingManager: buildingData.buildingManager,
        phone: buildingData.phone,
      });

      setImagePreview(buildingData.buildingImage);
    }
  }, [buildingData]);

  useEffect(() => {
    if (imagePreview) {
      setBuildingInfo({ ...buildingInfo, buildingImage: imagePreview });
    }
  }, [imagePreview]);

  return (
    <div>
      <h6 className="text-base text-primary font-medium">
        General Information
      </h6>
      <form className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-3">
          <UploadModel
            setFile={setFile}
            imagePreview={imagePreview}
            setImagePreview={setImagePreview}
          />
        </div>
        <Input
          type="text"
          name="buildingName"
          label="Building Name"
          placeholder="Building Name"
          value={buildingInfo.buildingName}
          onChange={buildingInfoChangeHandler}
        />
        <Input
          type="text"
          name="buildingType"
          label="Building Type"
          placeholder="Building Type"
          value={buildingInfo.buildingType}
          onChange={buildingInfoChangeHandler}
        />
        <Input
          type="text"
          name="location"
          label="Location"
          placeholder="Warehouse 01, UK"
          value={buildingInfo.location}
          onChange={buildingInfoChangeHandler}
        />
        <Input
          type="text"
          name="area"
          label="Area"
          placeholder="Sq Ft"
          value={buildingInfo.area}
          onChange={buildingInfoChangeHandler}
        />
        <Input
          type="number"
          name="totalFloors"
          label="Total Floors"
          placeholder="45"
          value={buildingInfo.totalFloors}
          onChange={buildingInfoChangeHandler}
        />
        <Input
          type="number"
          name="totalRestrooms"
          label="Total Restrooms"
          placeholder="3"
          value={buildingInfo.totalRestrooms}
          onChange={buildingInfoChangeHandler}
        />
        <div className="lg:col-span-2">
          <Input
            type="text"
            name="buildingManager"
            label="Building Manager"
            placeholder="MKS"
            value={buildingInfo.buildingManager}
            onChange={buildingInfoChangeHandler}
          />
        </div>
        <Input
          type="tel"
          name="phone"
          label="Phone Number"
          placeholder="(123) 456-8034"
          value={buildingInfo.phone}
          onChange={buildingInfoChangeHandler}
        />
        <div className="lg:col-span-3 flex justify-end">
          <Button text="Next" onClick={nextBtnHandler} />
        </div>
      </form>
    </div>
  );
};

export default GeneralInfo;
