import React from "react";
import TwoMen from "../../../../../public/assets/images/dashboard/TwoMen";
import MostUsedRestrooms from "../MostUsedRestrooms";

const UsedRestroom = () => {
  return (
    <div className="piechart p-5">
      <div className="flex items-center gap-1">
        <TwoMen />
        <h2 className="text-[20px] leading-[30px] font-[500] ">
          Most Used Restrooms
        </h2>
      </div>
      <MostUsedRestrooms />
    </div>
  );
};

export default UsedRestroom;
