import React from "react";
import AreaCharts from "../../../../components/charts/areaChart/AreaChart";

const OverallPerformance = () => {
  return (
    <div className="bg-white rounded-2xl shadow-md border-[1px] p-5">
      <AreaCharts
        width="100%"
        height={300}
        title="Overall Performance"
        showXAxis={true}
        showYAxis={true}
        showGrid={true}
      />
    </div>
  );
};

export default OverallPerformance;
