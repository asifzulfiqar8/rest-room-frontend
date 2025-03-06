import PieChartComponent from "../../components/charts/pieChart/PieChart";

import icon1 from "../../assets/dashboard/icon1.svg";
import icon2 from "../../assets/dashboard/icon2.svg";
import icon3 from "../../assets/dashboard/icon3.svg";
import icon4 from "../../assets/dashboard/icon4.svg";
import ImageCard from "../../components/card/ImageCard";
import ThreeLinesCircularChart from "../../components/charts/pieChart/ThreeLinesCircularChart";
import { batteryLevelData } from "../../components/charts/chartdata";
import Alert from "../../../public/assets/images/dashboard/Alert";
import TwoMen from "../../../public/assets/images/dashboard/TwoMen";
import MostUsedRestrooms from "./components/MostUsedRestrooms";
import AreaChart from "../../components/charts/areaChart/AreaChart";
import Building from "../../../public/assets/images/dashboard/Building";
import ActivityChart from "../../components/charts/activityChart/ActivityChart";
import SimpleLineChart from "../../components/charts/simpleLineChart/SimpleLineChart";
import LineChart from "../../components/charts/areaChart/LineChart";
import InfoCards from "./components/InfoCards";
import BuildingCard from "../../components/card/BuildingCard";

const buildingDatas = [
  { name: "Building A" },
  { name: "Building B" },
  { name: "Building C" },
];

const AdminDashboard = () => {
  return (
    <>
      <div>
        <div className="parentContainer ">
          <div className=" grid lg:grid-cols-12 gap-4">
            <InfoCards
              totalBuilding="210"
              buildingIcon={icon1}
              buildingInfo="Total Buildings"
              percent="Up from yesterday"
              color={"#e1e1f5"}
              hoverColor={"#e1e1f5"}
            />
            <InfoCards
              totalBuilding="250"
              buildingIcon={icon2}
              buildingInfo="Total Restrooms"
              percent="Up from yesterday"
              color={"#e1e1f5"}
              hoverColor={"#e1e1f5"}
            />
            <InfoCards
              totalBuilding="350"
              buildingIcon={icon3}
              buildingInfo="Total Sensors"
              percent="Up from yesterday"
              color={"#FFDEDC"}
              hoverColor={"#FFDEDC"}
            />
            <InfoCards
              totalBuilding="50"
              buildingIcon={icon4}
              buildingInfo="Total Subscriptions"
              percent="Up from yesterday"
              color={"#DEFFEE"}
              hoverColor={"#DEFFEE"}
            />
          </div>

          <div className="grid grid-cols-12 gap-4 mt-4">
            <div className="col-span-12 xl:col-span-9 piechart">
              <AreaChart
                width="100%"
                height={300}
                title="Buildings Performance"
                showXAxis={true}
                showYAxis={true}
                showGrid={true}
              />
            </div>
            <div className="piechart col-span-12 xl:col-span-3  p-5 ">
              <div className="flex gap-1 items-center">
                <Building />
                <h2 className="text-[20px] leading-[30px] font-[500] ">
                  Top Buildings
                </h2>
              </div>
              <div className="flex items-center justify-center">
                <PieChartComponent />
              </div>
            </div>
          </div>
          <div className=" grid md:lg:grid-cols-1 xl:grid-cols-3 gap-4 mt-4">
            <div className="piechart">
              <h2 className="text-[20px] leading-[30px] font-[500] mb-2 p-5">
                Users Engagement
              </h2>
              <LineChart />
            </div>
            <div className="piechart ">
              {" "}
              <h2 className="text-[20px] leading-[30px] font-[500] p-5 ">
                Restrooms Performance
              </h2>
              <SimpleLineChart />
            </div>
            <div className="piechart p-5">
              <div className="flex gap-1">
                <Alert />
                <h2 className="text-[20px] leading-[30px] font-[500] ">
                  Active Sensors
                </h2>
              </div>
              <div className="flex flex-col h-[100%] tems-center justify-center">
                <ThreeLinesCircularChart data={batteryLevelData} />
              </div>
            </div>
          </div>
          <div className=" grid grid-cols-1 lg:grid-cols-12 gap-4 mt-4">
            <div className="piechart py-5  col-span-12 md:col-span-12 xl:col-span-8">
              <h2 className="text-[20px] leading-[30px] font-[500] px-5">
                Restrooms Activity
              </h2>

              <ActivityChart />
            </div>

            <div className="piechart p-5 col-span-12 md:col-span-12 xl:col-span-4">
              <div className="flex items-center gap-1">
                <TwoMen />
                <h2 className="text-[20px] leading-[30px] font-[500] ">
                  Most Used Restrooms
                </h2>
              </div>
              <div>
                <MostUsedRestrooms />
              </div>
            </div>
          </div>
          <div>
            <div className="mt-5 piechart p-5">
              <h2 className="text-2xl mb-4 font-semibold">All Buildings</h2>
              <div className="grid xs:grid-cols-1 lg:grid-cols-2  xl:grid-cols-3 gap-4">
                {buildingDatas.map((data, i) => (
                  <BuildingCard name={data.name} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
