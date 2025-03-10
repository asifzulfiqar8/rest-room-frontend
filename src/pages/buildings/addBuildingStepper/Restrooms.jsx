/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IoAddOutline } from "react-icons/io5";
import { TbMinus } from "react-icons/tb";
import { MdDelete } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import Button from "../../../components/shared/button/Button";
import Dropdown from "../../../components/shared/dropdown/Dropdown";
import Input from "../../../components/shared/input/Input";
import MarkBuildingModel from "./MarkBuildingModel";

const AddRestrooms = ({ setCurrentStep }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { buildingData } = useSelector((state) => state.building);
  const [restroomsState, setRestroomsState] = useState([]);
  const [sensorsOptions, setSensorsOptions] = useState([
    { option: "", value: "", icon: "" },
  ]);
  const [accordionState, setAccordionState] = useState([]);
  const [buildingId, setBuildingId] = useState("");
  const totalRestrooms = Number(buildingData?.totalRestrooms) || 1;
  const [floorsCount, setFloorsCount] = useState(
    Array.from({ length: totalRestrooms }, () => 0)
  );

  console.log("restroomsState", restroomsState);

  // Toggle specific accordion
  const toggleAccordion = (index) => {
    setAccordionState((prev) =>
      prev.map((isOpen, i) => (i === index ? !isOpen : isOpen))
    );
  };

  const openNextAccordion = (index) =>
    setAccordionState((prev) =>
      prev.map((isOpen, i) => (i === index + 1 ? true : false))
    );

  // Check if all floors are filled to enable the Next button
  // const allFloorsFilled =
  //   restroomsState.length === floorsCount.length &&
  //   restroomsState.every(
  //     (floor) =>
  //       floor.floorName &&
  //       floor.roomsCount &&
  //       floor.twoDModal &&
  //       floor.selectedSensors?.length &&
  //       floor.twoDModelCoordinates?.length
  //   );

  const mainSaveHandler = async () => {
    console.log("main save handler clicked");
  };

  useEffect(() => {
    setAccordionState(new Array(floorsCount.length).fill(false));
  }, [floorsCount]);

  return (
    <div>
      {floorsCount.map((floor, i) => (
        <Accordion
          key={i}
          title={`Restroom ${i + 1}`}
          isOpen={accordionState[i]}
          toggleAccordion={() => toggleAccordion(i)}
        >
          <AddRestroom
            restroomsState={restroomsState}
            setRestroomsState={setRestroomsState}
            restroomIndex={i}
            sensorsOptions={sensorsOptions}
            setSensorsOptions={setSensorsOptions}
            openNextAccordion={() => openNextAccordion(i)}
          />
        </Accordion>
      ))}
      <div className="flex items-center justify-end gap-4">
        <Button
          text="Back"
          onClick={() => setCurrentStep((prevStep) => prevStep - 1)}
          bg="bg-[#ACACAC40] text-[#111111B2] hover:bg-primary hover:text-white"
        />
        <Button
          type="button"
          text="Add Building"
          width="w-[168px]"
          onClick={mainSaveHandler}
        />
      </div>
    </div>
  );
};

export default AddRestrooms;

// Reusing your AddRestroom Component
const AddRestroom = ({
  restroomsState,
  setRestroomsState,
  restroomIndex,
  sensorsOptions,
  setSensorsOptions,
  openNextAccordion,
}) => {
  const [file, setFile] = useState();
  const [buildingModelImage, setBuildingModelImage] = useState();
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    status: "",
    area: "",
    toilets: "",
  });
  const [polygons, setPolygons] = useState([]);

  const formChangeHandler = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const saveStateHandler = () => {
    // if (
    //   !floorName ||
    //   !roomsCount ||
    //   !setFile ||
    //   !twoDModalPreview ||
    //   !twoDModelCoordinates ||
    //   selectedSensors?.length === 0
    // ) {
    //   console.log(
    //     "Please Enter all Fields to Save",
    //     floorName,
    //     roomsCount,
    //     setFile,
    //     twoDModalPreview,
    //     twoDModelCoordinates,
    //     selectedSensors
    //   );
    //   return toast.error("Please Enter all Fields to Save");
    // }

    // Save floor data into the restroomsState
    const newRestroomState = [...restroomsState];
    newRestroomState[restroomIndex] = {
      ...formData,
      file,
      buildingModelImage,
      polygons,
    };
    setRestroomsState(newRestroomState);

    // Open the next accordion
    openNextAccordion();
  };

  return (
    <div>
      <form className="grid grid-cols-1 lg:grid-cols-12 gap-4 my-4">
        <div className="lg:col-span-4">
          <Input
            label="Restroom Name"
            type="text"
            placeholder="Restroom 1"
            name="name"
            value={formData.name}
            onChange={formChangeHandler}
          />
        </div>
        <div className="lg:col-span-4">
          <Dropdown
            defaultText="Type"
            options={[
              { option: "Private", value: "private" },
              { option: "Public", value: "public" },
            ]}
            label="Type"
            onSelect={(value) => setFormData({ ...formData, type: value })}
          />
        </div>
        <div className="lg:col-span-4">
          <Dropdown
            defaultText="Active"
            options={[
              { option: "Active", value: "active" },
              { option: "Inactive", value: "inactive" },
            ]}
            label="Status"
            onSelect={(value) => setFormData({ ...formData, status: value })}
          />
        </div>
        <div className="lg:col-span-6">
          <Input
            label="Area"
            type="text"
            placeholder="Sq ft"
            name="area"
            value={formData.area}
            onChange={formChangeHandler}
          />
        </div>
        <div className="lg:col-span-6">
          <Input
            label="Number Of Toilets"
            type="text"
            placeholder="5"
            name="toilets"
            value={formData.toilets}
            onChange={formChangeHandler}
          />
        </div>
      </form>
      <div className="flex items-center justify-end gap-4">
        <div className="flex items-center gap-4">
          <div className="cursor-pointer bg-red-300 p-1 rounded-md">
            <MdDelete fontSize={22} color="white" />
          </div>
        </div>
      </div>
      <div className="my-4 flex justify-center">
        <MarkBuildingModel
          setFile={setFile}
          buildingModelImage={buildingModelImage}
          setBuildingModelImage={setBuildingModelImage}
          polygons={polygons}
          setPolygons={setPolygons}
        />
      </div>

      <div className="flex items-center justify-end gap-4">
        <Button
          type="button"
          text="Save"
          width="w-[128px]"
          onClick={saveStateHandler}
        />
      </div>
    </div>
  );
};

// Accordion Component (basic structure)
const Accordion = ({ title, isOpen, toggleAccordion, children }) => {
  return (
    <div className="mb-4">
      <div
        onClick={toggleAccordion}
        className={`flex items-center justify-between gap-4 cursor-pointer w-full text-left px-5 py-3 font-semibold border rounded-lg ${
          isOpen ? "border-primary" : "border-[#b7b7b7]"
        }`}
      >
        <button className={`${isOpen ? "text-primary" : "text-[#b7b7b7]"}`}>
          {title}
        </button>
        <div>
          {isOpen ? (
            <TbMinus color={isOpen ? "#A449EB" : "#b7b7b7"} />
          ) : (
            <IoAddOutline
              fontSize={20}
              color={isOpen ? "#A449EB" : "#b7b7b7"}
            />
          )}
        </div>
      </div>
      {isOpen && <div className="py-4">{children}</div>}
    </div>
  );
};
