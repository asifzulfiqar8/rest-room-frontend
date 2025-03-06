/* eslint-disable react/prop-types */
import { IoLocationSharp } from "react-icons/io5";
import Image from "../../assets/card1.png";
import Button from "../shared/button/Button";

const BuildingCard = ({  buildingType = "public" }) => {
  // const {
  // buildingLocation = "Technology Park"
  // buildingName = "Arfa Heights"
  // buildingType = "public",
  // totalFloors = 4,
  // totalRestrooms = 16,
  // } = data;
  // Determine the button color based on the building type
  const getButtonColor = (type) => {
    switch (type?.toLowerCase()) {
      case "public":
        return "bg-green-500";
      case "private":
        return "bg-red-500";
      case "commercial":
        return "bg-yellow-800";
      default:
        return "bg-blue-500"; // Default color if type is not recognized
    }
  };

  return (
    <div className=" rounded-[20px] overflow-hidden">
      <div>
        <img
          className="w-full h-[200px] object-cover"
          src={Image}
          alt="Building"
        />
      </div>
      <div className="p-4 md:p-6 rounded-b-[20px]  rounded-t-[30px] relative top-[-25px] bg-[#F7F7F7]">
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"> */}
        <div className="flex justify-between w-full items-center flex-wrap">
          <div className="text-center sm:text-left">
            <div className="flex items-center gap-1">
              <IoLocationSharp />
              <p className="text-xs sm:text-base text-[#111111] font-[400]">
                Location
              </p>
            </div>
            <h2 className="text-sm sm:text-xl mt-1 text-[#111111] font-[500]">
              Building Name
            </h2>
          </div>

          <div
            className={`${
              buildingType == "public"
                ? "bg-secondary"
                : buildingType === "private"
                ? "bg-red-500"
                : buildingType === "commercial"
                ? "bg-yellow-800"
                : ""
            }  w-fit px-4 py-2 capitalize text-white text-sm font-bold rounded-[11px]`}
          >
            {buildingType}
          </div>
        </div>
        {/* </div> */}

        <div className="grid gid-cols-1 lg:grid-cols-2 gap-4 mt-4">
          <div className="box p-2 flex flex-col gap-2 items-center bg-[#E8E2FF] rounded-[7px]">
            <p className="text-lg md:text-2xl font-semibold  text-primary">4</p>
            <p className="text-xs md:text-sm text-[#11111199]">
              Number Of Floors
            </p>
          </div>
          <div className="box p-2 flex flex-col gap-2 items-center bg-[#E8E2FF] rounded-[7px]">
            <p className="text-lg md:text-2xl font-semibold  text-primary">
              14
            </p>
            <p className="text-xs md:text-sm text-[#11111199]">
              Number Of Restrooms
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuildingCard;
