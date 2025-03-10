/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Dropdown from "../../../components/shared/dropdown/Dropdown";
import Input from "../../../components/shared/input/Input";
import { IoAdd } from "react-icons/io5";
import { HiOutlineMinusSm } from "react-icons/hi";
import AddSensors from "./AddSensors";
import { useSelector } from "react-redux";

const RestroomAccordion = ({ onDataChange }) => {
  const [polygons, setPolygons] = useState([]);
  const [image, setImage] = useState(null);
  const { buildingData } = useSelector((state) => state.building);
  const restRoomsLength = buildingData?.totalRestrooms || 1;
  const [restrooms, setRestrooms] = useState(
    Array.from({ length: restRoomsLength }, () => ({
      restroomName: "",
      type: "",
      status: "",
      area: "",
      toilets: "",
      restroomModelImage: "",
      restroomModelCoordinates: [],
    }))
  );

  const [activeAccordionIndex, setActiveAccordionIndex] = useState(null);

  const handleAccordionToggle = (index) => {
    setActiveAccordionIndex((prevIndex) =>
      prevIndex === index ? null : index
    );
  };

  const handleInputChange = (index, field, value) => {
    const updatedRestrooms = [...restrooms];
    updatedRestrooms[index][field] = value;
    setRestrooms(updatedRestrooms);
    onDataChange(updatedRestrooms);
  };

  useEffect(() => {
    if (image && polygons.length > 0) {
      const updatedRestrooms = [...restrooms];
      updatedRestrooms[activeAccordionIndex].restroomModelImage = image;
      updatedRestrooms[activeAccordionIndex].restroomModelCoordinates =
        polygons;
      setRestrooms(updatedRestrooms);
      onDataChange(updatedRestrooms);
    }
  }, [image, polygons]);

  return (
    <div className="flex flex-col gap-4">
      {restrooms.map((restroom, index) => (
        <Restroom
          key={index}
          isOpen={activeAccordionIndex === index}
          onToggle={() => handleAccordionToggle(index)}
          data={restroom}
          onChange={(field, value) => handleInputChange(index, field, value)}
          image={image}
          setImage={setImage}
          polygons={polygons}
          setPolygons={setPolygons}
        />
      ))}
    </div>
  );
};

const Restroom = ({
  isOpen,
  onToggle,
  data,
  onChange,
  image,
  setImage,
  polygons,
  setPolygons,
}) => {
  return (
    <div>
      {/* Accordion Header */}
      <div
        className={`flex items-center justify-between border rounded-[4px] px-4 md:px-8 py-2 ${
          isOpen ? "border-primary" : "border-[#b7b7b7]"
        }`}
      >
        <h6
          className={`text-base md:text-lg font-semibold ${
            isOpen ? "text-primary" : "text-[#666666]"
          }`}
        >
          Restroom Name
        </h6>
        <div className="flex items-center gap-4">
          <div className="cursor-pointer" onClick={onToggle}>
            {isOpen ? (
              <HiOutlineMinusSm fontSize={20} className="text-primary" />
            ) : (
              <IoAdd fontSize={20} className="text-[#666666]" />
            )}
          </div>
        </div>
      </div>

      {/* Accordion Content */}
      {isOpen && (
        <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Input
            label="Restroom name"
            type="text"
            placeholder="Restroom name"
            value={data.restroomName}
            onChange={(e) => onChange("restroomName", e.target.value)}
          />
          <Dropdown
            label="Type"
            defaultText="Type"
            options={[{ option: "Private", value: "Private" }]}
            value={data.type}
            onSelect={(value) => onChange("type", value)}
          />
          <Dropdown
            label="Status"
            defaultText="Type"
            options={[
              { option: "Active", value: "Active" },
              { option: "Inactive", value: "inactive" },
            ]}
            value={data.status}
            onChange={(value) => onChange("status", value)}
          />
          <Input
            label="Area"
            type="text"
            placeholder="Sq ft"
            value={data.area}
            onChange={(e) => onChange("area", e.target.value)}
          />
          <Input
            label="Number of Toilets"
            type="text"
            placeholder="5"
            value={data.toilets}
            onChange={(e) => onChange("toilets", e.target.value)}
          />
          <div className="lg:col-span-3 flex justify-center">
            <AddSensors
              image={image}
              setImage={setImage}
              polygons={polygons}
              setPolygons={setPolygons}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default RestroomAccordion;
