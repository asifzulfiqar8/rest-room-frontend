/* eslint-disable react/prop-types */
import { useState } from "react";
import arrow from "../../../assets/dashboard/arrow.svg";

const InfoCards = ({
  totalBuilding,
  buildingIcon,
  buildingInfo,
  percent,
  color,
  hoverColor,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="card flex justify-between items-start lg:col-span-3"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        backgroundColor: isHovered ? hoverColor : "white",
        transition: "background-color 0.3s ease",
      }}
    >
      <div className="buildingInfo">
        <p className="text-sm md:text-base">{buildingInfo}</p>{" "}
        {/* Responsive text size */}
        <h2 className="text-lg md:text-xl">{totalBuilding}</h2>{" "}
        {/* Responsive heading size */}
        <div className="percent flex items-center gap-2 mt-2">
          <img src={arrow} alt="arrow icon" />
          <p className="ml-1 text-xs md:text-sm">
            <span className="mr-1">8.5%</span>
            {percent}
          </p>{" "}
          {/* Responsive percent size */}
        </div>
      </div>
      <div className="building_icon" style={{ backgroundColor: color }}>
        <img src={buildingIcon} alt={buildingInfo} />
      </div>
    </div>
  );
};

export default InfoCards;
