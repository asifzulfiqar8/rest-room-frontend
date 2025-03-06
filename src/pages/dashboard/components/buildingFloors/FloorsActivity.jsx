import React from "react";
import ActivityChart from "../../../../components/charts/activityChart/ActivityChart";

const FloorsActivity = () => {
  return (
    <div className="piechart py-5">
      <h2 className="text-[20px] leading-[30px] font-[500] px-5 ">
        Restrooms Activity
      </h2>
      <ActivityChart />
    </div>
  );
};

export default FloorsActivity;
