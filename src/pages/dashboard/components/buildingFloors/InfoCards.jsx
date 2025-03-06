import React, { useState } from "react";

const InfoCards = ({ title, count, icon, borderColor, hoverColor }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`p-5 piechart border-t-[10px] transition duration-200 ease-in-out hover:bg-blue-100`}
      style={{
        borderTopColor: borderColor,

        backgroundColor: isHovered ? hoverColor : "white",
        transition: "background-color 0.3s ease",
      }}
    >
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <h4 className="font-[500] leading-[24px] text-[16px]">{title}</h4>
          <h2 className="font-[500] leading-[45px] text-[30px] text-[#131215]">
            {count}
          </h2>
        </div>
        <div>
          <img src={icon} />{" "}
        </div>
      </div>
    </div>
  );
};

export default InfoCards;
