import React from "react";
import AreaCharts from "../../../../components/charts/areaChart/AreaChart";

const StallUsage = () => {
  return (
    <div className="piechart ">
      <h2 className="text-[#068F9A] text-[22px] font-[600] leading-[33px] py-5">
        Stall Usage
      </h2>
      <AreaCharts
        width="100%"
        height={400}
        title=""
        showXAxis="true"
        showYAxis="true"
        showGrid="true"
        show="true"
      />
    </div>
  );
};

export default StallUsage;
