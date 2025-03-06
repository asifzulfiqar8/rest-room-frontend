import React from "react";
import SimpleLineChart from "../../../../components/charts/simpleLineChart/SimpleLineChart";

const FlowCount = () => {
  return (
    <div className="piechart ">
      <h2 className="text-[#068F9A] text-[22px] font-[600] leading-[33px] py-5">
        Flow Count
      </h2>
      <SimpleLineChart />
    </div>
  );
};

export default FlowCount;
