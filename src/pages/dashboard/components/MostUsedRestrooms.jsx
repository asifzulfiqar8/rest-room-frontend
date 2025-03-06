import AreaCharts from "../../../components/charts/areaChart/AreaChart";
import LineChart from "../../../components/charts/areaChart/AreaChart";

const list = [
  {
    room: "Restroom 5",
    floor: "Floor 7",
    used: "70%",
  },
  {
    room: "Restroom 3",
    floor: "Floor 2",
    used: "30%",
  },

  {
    room: "Restroom 1",
    floor: "Floor 9",
    used: "60%",
  },
];
const MostUsedRestrooms = () => {
  return (
    <>
      {list.map((item, i) => (
        <div>
          <div key={i} className="flex justify-between items-center">
            <div className="flex flex-col">
              <h4 className="text-[14px] font-[700] leading-[16.94px]">
                {item.room}
              </h4>
              <h6 className="text-[12px] font-[500] leading-[14.52px]">
                {item.floor}
              </h6>
            </div>
            <div className="w-[50%]">
              <AreaCharts
                width="100%"
                height={70}
                howXAxis={false}
                showYAxis={false}
                showGrid={false}
              />
              {/* <Chart width="100%" height={120} /> */}
            </div>
            <div>
              <h4 className="text-[14px] leading-[16.94px] font-[700]">
                {item.used}
              </h4>
            </div>
          </div>
          <hr />
        </div>
      ))}
    </>
  );
};

export default MostUsedRestrooms;
