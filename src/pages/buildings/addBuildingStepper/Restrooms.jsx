/* eslint-disable react/prop-types */

import { useState } from "react";
import Button from "../../../components/shared/button/Button";
import RestroomAccordion from "./RestroomAccordion";

const Restrooms = ({ setCurrentStep }) => {
  const [restroomData, setRestroomData] = useState([]);

  const handleDataChange = (data) => {
    setRestroomData(data);
  };

  const handleAddBuilding = () => {
    console.log("Restroom Data:", restroomData);
  };

  return (
    <div>
      <h6 className="text-base text-primary font-medium">Restrooms</h6>
      <div className="my-5">
        <RestroomAccordion onDataChange={handleDataChange} />
      </div>
      <div className="flex items-center justify-end gap-4">
        <Button
          text="Back"
          onClick={() => setCurrentStep((prevStep) => prevStep - 1)}
          bg="bg-[#ACACAC40] text-[#111111B2] hover:bg-primary hover:text-white"
        />
        <Button text="Add Building" onClick={handleAddBuilding} />
      </div>
    </div>
  );
};

export default Restrooms;
