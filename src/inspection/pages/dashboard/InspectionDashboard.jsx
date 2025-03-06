import BuildingCard from "../../../components/card/BuildingCard";

const InspectionDashboard = () => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-2 md:p-5">
      <h3 className="mb-2 font-bold text-sm sm:text-base">All Buildings</h3>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <BuildingCard />
        <BuildingCard />
        <BuildingCard />
        <BuildingCard />
        <BuildingCard />
      </div>
    </div>
  );
};

export default InspectionDashboard;
