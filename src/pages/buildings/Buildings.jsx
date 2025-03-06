import { FaPlus, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import BuildingCard from "../../components/card/BuildingCard";
import { useEffect, useState } from "react";
import { buildingCardData } from "../../data/data";

const Buildings = () => {
  const location = useLocation();
  const [page, setPage] = useState(1); // Current page number
  const [limit] = useState(6); // Number of items per page

  // Fetch buildings with the current page and limit

  // Refetch when location changes
  // useEffect(() => {
  //   refetch();
  // }, [location]);

  // Handle page change
  const handleNextPage = () => {
    if (page < data?.totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  return (
    // <div className=" animate-slide-up">
    <div className="bg-white rounded-2xl shadow-md border-[1px] p-5">
      <div className="mb-4 flex justify-between items-center">
        <h4 className="text-base md:text-lg font-[600] leading-[32px]">
          All Buildings
        </h4>
        <Link to="/add-building">
          <FaPlus className="text-blue-500 hover:text-blue-600 text-2xl" />
        </Link>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-3 ">
        {buildingCardData.map((id, building) => (
          <Link to={`/building-floor`} key={id}>
            <BuildingCard data={building} />
          </Link>
        ))}
      </div>
    </div>
    // </div>
  );
};

export default Buildings;
