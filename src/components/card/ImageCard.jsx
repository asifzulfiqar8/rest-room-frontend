import BuildingCard from "./BuildingCard";

const buildingDatas = [
  { name: "Building A" },
  { name: "Building B" },
  { name: "Building C" },
];
const ImageCard = () => {
  return (
    <div className="mt-5 piechart p-5">
      <h2 className="text-2xl mb-4 font-semibold">All Buildings</h2>
      <div className="grid xs:grid-cols-1 lg:grid-cols-2  xl:grid-cols-3 gap-4">
        {buildingDatas.map((data, i) => {
          <BuildingCard name={data.name} />;
        })}
      </div>
    </div>
  );
};

export default ImageCard;
