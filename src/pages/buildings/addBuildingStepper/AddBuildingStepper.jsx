import React, { useState } from "react";
import GeneralInfo from "./GeneralInfo";
import BuildingModel from "./BuildingModel";
import Maping from "./Maping";
import Restrooms from "./Restrooms";

const AddBuildingStepper = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    "General Information",
    "Building Model",
    "Maping",
    "Restrooms",
  ];

  const renderStep = (step) => {
    switch (step) {
      case 1:
        return <GeneralInfo setCurrentStep={setCurrentStep} />;
      case 2:
        return <BuildingModel setCurrentStep={setCurrentStep} />;
      case 3:
        return <Maping setCurrentStep={setCurrentStep} />;
      case 4:
        return <Restrooms setCurrentStep={setCurrentStep} />;
      default:
        return null;
    }
  };
  return (
    <div className="bg-white border border-[#63636321] shadow-md p-4 rounded-xl">
         <h4 className="text-center text-[#05004E] text-base md:text-[22px] font-semibold">
          Add Building
        </h4>
        <div className="flex items-center justify-center mt-4">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center">
              <div
                className={`size-[32px] transition-all duration-200 rounded-full text-lg font-medium grid place-items-center ${
                  index > currentStep
                    ? "bg-[#D9D9D9] text-[#11111180]"
                    : index == currentStep
                    ? "bg-[#D9D9D9] text-[#000]"
                    : "bg-primary text-white"
                }`}
              >
                {index + 1}
              </div>
              <h6 className="text-base md:text-lg font-medium text-[#000] ml-3">
                {step}
              </h6>
              {index < steps.length - 1 && (
                <div
                  className={`h-[1px] w-[100px] transition-all duration-300 ${
                    index >= currentStep ? "bg-[#D9D9D9]" : "bg-primary"
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>
      <div className="mt-4 md:mt-6">{renderStep(currentStep)}</div>
    </div>
  );
};

export default AddBuildingStepper;
