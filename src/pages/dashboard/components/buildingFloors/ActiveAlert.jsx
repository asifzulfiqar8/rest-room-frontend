import React from "react";
import ThreeLinesCircularChart from "../../../../components/charts/pieChart/ThreeLinesCircularChart";
import { batteryLevelData } from "../../../../components/charts/chartdata";
import Alert from "../../../../../public/assets/images/dashboard/Alert";
import { HiOutlineExclamation } from "react-icons/hi";

const alerts = [
  "Restroom 305 on Floor 5 needs cleaning",
  "Restroom 102 on Floor 1 has a leaking faucet",
  "Restroom 101 on Floor 2 at 90% occupancy",
];
const ActiveAlert = () => {
  return (
    <div className="piechart p-5">
      <div className="flex justify-between items-center">
        <div className="flex gap-1">
          <Alert />
          <h2 className="text-[20px] leading-[30px] font-[500] ">
            Active Alerts
          </h2>
        </div>
        <button className="text-[#A449EB]">See all</button>
      </div>
      <ThreeLinesCircularChart data={batteryLevelData} />

      <h6 className="text-[#11111160] text-[14px] leading-[21px] my-[10px] ">
        Alerts
      </h6>

      {alerts.map((alert, i) => {
        return (
          <div className="bg-[#FFECEC] text-[#F42F2F] rounded-[6px] p-[15px] flex gap-2 items-center mb-3">
            <span className="font-semibold">
              <HiOutlineExclamation />
            </span>

            <p>{alert}</p>
          </div>
        );
      })}
    </div>
  );
};

export default ActiveAlert;
