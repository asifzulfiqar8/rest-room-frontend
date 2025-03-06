import PieChartComponent from "../../../../components/charts/pieChart/PieChart";
import Building from "../../../../../public/assets/images/dashboard/Building";

const TopBuilding = () => {
  return (
    <div className="bg-white rounded-2xl shadow-md border-[1px] p-5 h-full">
      <div className="flex gap-1 items-center">
        <Building />
        <h2 className="text-base md:text-lg leading-[30px] font-[500] ">
          Top Buildings
        </h2>
      </div>
      <div className="flex items-center justify-center">
        <PieChartComponent />
      </div>
    </div>
  );
};

export default TopBuilding;
