import React, { useEffect, useState } from "react";
import Button from "../../../components/shared/button/Button";
import Input from "../../../components/shared/input/Input";
import Map from "../../../components/Map";
import { useDispatch, useSelector } from "react-redux";
import { setBuilding } from "../../../services/building/buildingSlice";
import toast from "react-hot-toast";

const Mapping = ({ setCurrentStep }) => {
  const [mapping, setMapping] = useState({
    lat: "",
    lng: "",
  });
  const { buildingData } = useSelector((state) => state.building);
  const dispatch = useDispatch();

  const mappingChangeHandler = (e) => {
    const { name, value } = e.target;
    setMapping((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const nextBtnHandler = () => {
    if (mapping.lat && mapping.lng) {
      dispatch(setBuilding({ mapInfo: mapping }));
      setCurrentStep((prevStep) => prevStep + 1);
    } else {
      toast.error("Please enter lat and lng");
    }
  };

  useEffect(() => {
    if (buildingData?.mapInfo.lat && buildingData?.mapInfo.lng) {
      setMapping(buildingData?.mapInfo);
    }
  }, [buildingData?.mapInfo]);

  console.log("buildingData", buildingData);

  return (
    <div>
      <h6 className="text-base text-primary font-medium">Maping</h6>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mt-4">
        <Input
          type="number"
          name="lat"
          label="Latitude"
          placeholder="Enter Latitude"
          value={mapping.lat}
          onChange={mappingChangeHandler}
        />
        <Input
          type="number"
          label="Longitude"
          name="lng"
          placeholder="Enter Longitude"
          value={mapping.lng}
          onChange={mappingChangeHandler}
        />
      </div>

      <div className="lg:col-span-2 mt-4">
        <div className="h-[325px] rounded-lg shadow-md">
          <Map lat={mapping.lat} lng={mapping.lng} />
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-end gap-4 mt-4">
        <Button
          onClick={() => setCurrentStep((prevStep) => prevStep - 1)}
          text="Back"
          width="w-[153px]"
          bg="bg-transparent text-primary border-primary border-[1px] hover:bg-primary hover:text-white"
        />
        <Button onClick={nextBtnHandler} text="Next" width="w-[153px]" />
      </div>
    </div>
  );
};

export default Mapping;
