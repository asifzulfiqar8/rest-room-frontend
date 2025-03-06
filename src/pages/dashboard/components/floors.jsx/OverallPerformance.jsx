import React from "react";
import LineChart from "../../../../components/charts/areaChart/LineChart";

const OverallPerformance = () => {
  return (
    <div className="piechart ">
      <h2 className="text-[#068F9A] text-[22px] font-[600] leading-[33px] py-5">
        Overall Performance
      </h2>
      <LineChart />
    </div>
  );
};

export default OverallPerformance;
