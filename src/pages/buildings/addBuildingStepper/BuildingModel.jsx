import { useEffect, useState } from "react";
import Button from "../../../components/shared/button/Button";
import MarkBuildingModel from "./MarkBuildingModel";
import { useDispatch, useSelector } from "react-redux";
import { setBuilding } from "../../../services/building/buildingSlice";
import { base64ToBlob } from "../../../utils/utils";

const BuildingModel = ({ setCurrentStep }) => {
  const dispatch = useDispatch();
  const [buildingModelImage, setBuildingModelImage] = useState(null);
  const [polygons, setPolygons] = useState([]);

  const { buildingData } = useSelector((state) => state.building);
  console.log("buildingDAta", buildingData);

  const nextBtnHandler = () => {
    if (polygons.length > 0 && buildingModelImage) {
      console.log("done");
      dispatch(
        setBuilding({
          buildingModelPreview: buildingModelImage,
          buildingModelCoordinates: polygons,
        })
      );
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  useEffect(() => {
    if (
      buildingData?.buildingModelPreview &&
      buildingData?.buildingModelCoordinates
    ) {
      setBuildingModelImage(buildingData?.buildingModelPreview);
      setPolygons(buildingData.buildingModelCoordinates);
    }
  }, [buildingData]);

  console.log("buildingMOdel", buildingModelImage);
  return (
    <div>
      <h6 className="text-base text-primary font-medium">Building Model</h6>
      <div className="my-5">
        <MarkBuildingModel
          buildingModelImage={buildingModelImage}
          setBuildingModelImage={setBuildingModelImage}
          polygons={polygons}
          setPolygons={setPolygons}
        />
      </div>
      <div className="flex items-center justify-end gap-4">
        <Button
          text="Back"
          onClick={() => setCurrentStep((prevStep) => prevStep - 1)}
          bg="bg-[#ACACAC40] text-[#111111B2] hover:bg-primary hover:text-white"
        />
        <Button text="Next" onClick={nextBtnHandler} />
      </div>
    </div>
  );
};

export default BuildingModel;
