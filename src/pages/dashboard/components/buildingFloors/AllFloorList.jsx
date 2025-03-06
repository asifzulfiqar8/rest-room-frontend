import React from "react";
import { useLocation } from "react-router-dom";
import AllFloors from "./AllFloors";

const AllFloorList = ({ floorType = "All Floor" }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const allFloorsString = queryParams.get("data");
  const allFloors = allFloorsString
    ? JSON.parse(decodeURIComponent(allFloorsString))
    : [];

  return (
    <div className="parentContainer">
      <div className="piechart p-5">
        <div className="flex justify-between items-center">
          <h2 className="text-[20px] leading-[30px] font-[500] ">
            {floorType}
          </h2>

          {/* {allFloors.length > 1 && (
            <Link to="/home/all-floors">
              <button className="text-[#A449EB]">Back</button>
            </Link>
          )} */}
        </div>
        {allFloors.map((floor, i) => (
          <AllFloors
            key={i}
            floorNumber={floor.floorNumber}
            freeRestrooms={floor.freeRestrooms}
            activeSensors={floor.activeSensors}
            occupiedRestroom={floor.occupiedRestroom}
            totalRooms={floor.totalRooms}
            floor={allFloors}
          />
        ))}
      </div>
    </div>
  );
};

export default AllFloorList;
