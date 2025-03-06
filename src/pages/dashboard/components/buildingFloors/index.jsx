/* eslint-disable react/prop-types */
import InfoCards from "./InfoCards";
import greenStep from "../../../../assets/dashboard/subComponent/greenStep.svg";
import purpleRestroom from "../../../../assets/dashboard/subComponent/purpleRestroom.svg";
import yellowToilet from "../../../../assets/dashboard/subComponent/yellowToilet.svg";
import pinkBuzzer from "../../../../assets/dashboard/subComponent/pinkBuzzer.svg";
import ActiveAlert from "./ActiveAlert";
import UsedRestroom from "./UsedRestroom";
import FloorsActivity from "./FloorsActivity";
import AllFloors from "./AllFloors";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BiEdit, BiLoader, BiTrash } from "react-icons/bi";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogFooter,
} from "@material-tailwind/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { IoLocationSharp } from "react-icons/io5";
import { BsQrCode } from "react-icons/bs";
import { FaSquare } from "react-icons/fa";

import rawBuilding from "../../../../assets/images/raw-building.png";

const BuildingFloors = ({ floorType = "All Floors" }) => {
  const id = useParams().id;
  // const { data, refetch } = useGetSingleBuildingQuery(id);
  // const [deleteBuilding] = useDeleteBuildingMutation();
  const [open, setOpen] = useState(false);
  const [enteredId, setEnteredId] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOpen = () => setOpen(!open);

  const handleInputChange = (e) => {
    setEnteredId(e.target.value);
  };

  const handleSubmitBuilding = async () => {
    if (enteredId !== data?.building?._id) {
      toast.error("The entered ID does not match the building ID.");
      return;
    }

    setOpen(false);

    try {
      const res = await deleteBuilding(id);

      if (res.data.success) {
        dispatch(removeBuilding(id)); // Remove building from Redux store
        toast.success(res.data.message);
        refetch(); // Refresh the data after successful deletion
        navigate("/home/building"); // Navigate to the buildings list
      }
    } catch (error) {
      toast.error(error.data.message);
    }
  };

  const infoCardsData = [
    {
      title: "Total Floors",
      count: 2,
      icon: greenStep,
      borderColor: "#078E9B",
      hoverColor: "#078E9B15",
    },
    {
      title: "Total Restrooms",
      count: 5,
      icon: purpleRestroom,
      borderColor: "#A449EB",
      hoverColor: "#A449EB15",
    },
    {
      title: "Restrooms In Use",
      count: 135,
      icon: yellowToilet,
      borderColor: "#FF9500",
      hoverColor: "#FF950015",
    },
    {
      title: "Total Sensors",
      count: 9,
      icon: pinkBuzzer,
      borderColor: "#FF4D85",
      hoverColor: "#FF4D8515",
    },
  ];

  return (
    <section className="parentContainer">
      <div className="deleteBuilding flex justify-end mb-3">
        <div
          style={{
            backgroundColor: "white",
            padding: "5px",
            borderRadius: "50%",
          }}
        >
          <BiTrash
            onClick={handleOpen}
            style={{ cursor: "pointer", color: "red", fontSize: "1.5rem" }}
          />
        </div>
        <div
          style={{
            backgroundColor: "white",
            padding: "5px",
            borderRadius: "50%",
            marginLeft: "10px",
          }}
        >
          {/* <Link to={`/home/update-building/${data?.building?._id}`}> */}
          <BiEdit
            style={{ cursor: "pointer", color: "blue", fontSize: "1.5rem" }}
          />
          {/* </Link> */}
        </div>
        <Dialog open={open} onClose={handleOpen} maxWidth="xs" fullWidth>
          <div className="p-5">
            <DialogHeader className="font-semibold text-lg mb-4 p-0">
              Confirmation!
            </DialogHeader>
            <p className="mb-2 text-red-300">12</p>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Enter building id"
                className="shadow-sm border-[1px] w-full sm:text-sm rounded-[5px] p-2 outline-none bg-white border-gray-300 text-gray-900"
                value={enteredId}
                onChange={handleInputChange}
              />
            </div>
            <DialogFooter className="flex justify-end mt-4">
              <Button
                onClick={handleOpen}
                className="mr-2 bg-transparent border-2 border-[#A449EB] text-[#A449EB]"
              >
                <span>Cancel</span>
              </Button>
              <Button
                className="bg-primary text-white"
                onClick={handleSubmitBuilding}
              >
                <span>Confirm</span>
              </Button>
            </DialogFooter>
          </div>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="piechart p-5 md:col-span-12 xl:col-span-8">
          <div className="flex lg:flex-row flex-col gap-4">
            <div className="flex flex-col justify-between lg:basis-[35%]">
              <div>
                <p className="text-[#9A9A9A] text-sm md:text-base font-[400] leading-[22.4px] flex gap-2 items-center">
                  <span>
                    <IoLocationSharp className="text-primary" />
                  </span>
                  1234 Elm Street, Springfield{" "}
                </p>
                <h1 className="font-[600] text-xl md:text-2xl text-primary">
                  Skyline Heights
                </h1>
                <p className="text-[#9A9A9A] text-xs md:sm font-[400] leading-[22.4px]">
                  Total Floors : 16
                </p>
              </div>
              <div>
                <h1 className="font-[600] text-base md:text-lg text-secondary">
                  Queuing Status
                </h1>
                <p className="text-xs text-[#030229] font-[400] flex gap-1 items-center">
                  <FaSquare className="text-[#80D3FF]" />
                  No
                </p>
                <p className="text-xs text-[#030229] font-[400] flex gap-1 items-center">
                  <FaSquare className="text-[#FFC472]" />
                  Small Queue
                </p>
                <p className="text-xs text-[#030229] font-[400] flex gap-1 items-center">
                  <FaSquare className="text-[#FE7F7F]" />
                  Large Queue
                </p>
              </div>
            </div>
            <div>
              <img
                // src={<BiLoader />}
                src={rawBuilding}
                alt="Building Model"
                // className="w-full object-contain"
                // style={{ height: "500px" }}
              />
            </div>
            <BsQrCode fontSize={35} className="cursor-pointer" />
          </div>
        </div>

        <div className="md:col-span-12 xl:col-span-4">
          <ActiveAlert />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-4">
        <div className="md:col-span-12 xl:col-span-8">
          <div className="grid md:grid-cols-1 xl:grid-cols-4 gap-4">
            {infoCardsData.map((card, i) => (
              <div key={i}>
                <InfoCards
                  title={card.title}
                  count={card.count}
                  icon={card.icon}
                  borderColor={card.borderColor}
                  hoverColor={card.hoverColor}
                />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 mt-4">
            <FloorsActivity />
          </div>
        </div>

        <div className="md:col-span-12 xl:col-span-4">
          <UsedRestroom />
        </div>
      </div>

      <div className="grid grid-cols-1 mt-4 piechart p-5">
        <div className="flex justify-between items-center">
          <h2 className="text-[20px] leading-[30px] font-[500]">Dense</h2>

          {/* {data?.building?.restRooms?.length > 1 && (
            <Link
              to={`/home/all-floors?data=${encodeURIComponent(
                JSON.stringify(data?.building?.restRooms)
              )}`}
            > */}
          <button className="text-[#A449EB]">View all</button>
          {/* </Link>
          )} */}
        </div>
        {/* {data?.building?.restRooms?.map((floor, index) => ( */}
        <AllFloors />
      </div>
    </section>
  );
};

export default BuildingFloors;
