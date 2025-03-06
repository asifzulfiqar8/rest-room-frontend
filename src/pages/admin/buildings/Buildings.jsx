import { Link } from "react-router-dom";
import { buildingCardData } from "../../../data/data";
import BuildingCard from "../../../components/card/BuildingCard";


const Buildings = () => {
  return (
    <article className="bg-white rounded-2xl shadow-md border-[1px] p-5">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-3 ">
        {buildingCardData.map((id, building) => (
          <Link to={`/building-floor`} key={id}>
            <BuildingCard data={building} />
          </Link>
        ))}
      </div>
    </article>
  );
}

export default Buildings