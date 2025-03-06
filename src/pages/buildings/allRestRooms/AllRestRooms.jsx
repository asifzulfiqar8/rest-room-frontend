import React, { useState } from "react";
import ArrowDown from "../../../assets/dashboard/subComponent/purpleArrowDownAccordion.svg";
import ArrowUp from "../../../assets/dashboard/subComponent/purpleArrowUpAccordion.svg";
import purpleRestroom from "../../../assets/dashboard/subComponent/purpleRestroom.svg";

import BlueWater from "../../../assets/dashboard/BlueWater";

import CircularProgressBar from "../../../components/shared/progress/CircularProgressBar";
import AccordionTable from "./AccordionTable";
import { FiPlus } from "react-icons/fi";
import Modal from "../../../components/modals/Modal";
import RedQueue from "../../../assets/dashboard/RedQueue";
import OrangeOdor from "../../../assets/dashboard/OrangeOdor";
import Button from "../../../components/shared/button/Button";
import Input from "../../../components/shared/input/Input";

const Accordion = () => {
  const [datas, setDatas] = useState([
    {
      restRoom: "Restroom 1",
      status: "active",
      usersData: [
        {
          sensor: "Temperature Sensor 01",
          good: "",
          bad: "",
          excellent: "",
          malfunctioned: "",
          progress: (
            <CircularProgressBar
              percentage={50}
              width="w-[50px]"
              percentageSize="text-[12px]"
            />
          ),
          icon: <BlueWater />,
        },
        {
          sensor: "Temperature Sensor 02",
          good: "",
          bad: "",
          excellent: "",
          malfunctioned: "",
          progress: (
            <CircularProgressBar
              percentage={80}
              width="w-[50px]"
              percentageSize="text-[12px]"
            />
          ),
          icon: <RedQueue />,
        },
        {
          sensor: "Temperature Sensor 02",
          good: "",
          bad: "",
          excellent: "",
          malfunctioned: "",
          progress: (
            <CircularProgressBar
              percentage={25}
              width="w-[50px]"
              percentageSize="text-[12px]"
            />
          ),
          icon: <OrangeOdor />,
        },
      ],
    },
    {
      restRoom: "Restroom 2",
      status: "inactive",
      usersData: [
        {
          sensor: "Temperature Sensor 01",
          good: "",
          bad: "",
          excellent: "",
          malfunctioned: "",
          progress: (
            <CircularProgressBar
              percentage={50}
              width="w-[50px]"
              percentageSize="text-[12px]"
            />
          ),
          icon: <BlueWater />,
        },
        {
          sensor: "Temperature Sensor 02",
          good: "",
          bad: "",
          excellent: "",
          malfunctioned: "",
          progress: (
            <CircularProgressBar
              percentage={50}
              width="w-[50px]"
              percentageSize="text-[12px]"
            />
          ),
          icon: <BlueWater />,
        },
      ],
    },
  ]);

  return (
    <>
      {datas.map((data, i) => (
        <AccordionComponent key={i} index={i} setDatas={setDatas} data={data} />
      ))}
    </>
  );
};

const AllRestRooms = () => {
  return (
    <div className="parentContainer">
      <div className="piechart p-5">
        <h4 className="text-[20px] font-[600] leading-[32px] mb-4">
          All Restrooms
        </h4>
        <Accordion />
        <div className="my-2 flex justify-end">
          <Button text="Submit" width="w-[120px]" />
        </div>
      </div>
    </div>
  );
};

export default AllRestRooms;

const AccordionComponent = ({ data, setDatas, index }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [modal, setModal] = useState(false);
  const [newSensorName, setNewSensorName] = useState("");

  const modalOpenHandler = (modalType) => setModal(modalType);
  const modalCloseHandler = () => setModal(false);

  const toggleAccordion = () => {
    if (isOpen) {
      setIsClosing(true);
      setTimeout(() => {
        setIsOpen(false);
        setIsClosing(false);
      }, 300);
    } else {
      setIsOpen(true);
    }
  };

  const submitHandler = () => {
    setDatas((prevDatas) => {
      return prevDatas.map((data, i) => {
        if (i === index) {
          // Update the specific accordion
          return {
            ...data,
            usersData: [
              ...data.usersData,
              {
                id: Date.now(),
                sensor: newSensorName,
                good: "",
                bad: "",
                excellent: "",
                malfunctioned: "",
                icon: <BlueWater />,
              },
            ],
          };
        }
        return data;
      });
    });
    setModal(false);
    setNewSensorName("");
  };

  return (
    <div className="border-[#A449EB25] border-[2px] rounded-[15px] p-5 mb-2">
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <img
            src={purpleRestroom}
            className="w-[30px] h-[30px]"
            alt="Restroom"
          />
          <h4>{data.restRoom}</h4>
        </div>
        <div className="flex flex-col items-center">
          <h5 className="text-[14px] text-[#05004E80]">Type</h5>
          <h2 className="text-[16px] text-[#A449EB] font-[600]">Public</h2>
        </div>
        <div className="flex flex-col items-center">
          <h5 className="text-[14px] text-[#05004E80]">Number Of Toilets</h5>
          <h2 className="text-[16px] text-[#A449EB] font-[600]">50</h2>
        </div>
        <div className="flex gap-2 items-center">
          <Button
            text={data.status}
            bg={data.status === "active" ? "#61CA94" : "#FF8080"}
            className="p-2 w-[103px]"
          />
          <button onClick={toggleAccordion}>
            {isOpen ? (
              <img src={ArrowUp} alt="Arrow Up" />
            ) : (
              <img src={ArrowDown} alt="Arrow Down" />
            )}
          </button>
        </div>
      </div>
      <div
        style={{
          maxHeight: isOpen ? "500px" : "0px",
          opacity: isOpen ? 1 : 0,
          transition: "all 0.3s ease-in-out, opacity 0.3s ease-in-out",
          overflowX: "none",
          overflowY: "auto",
        }}
      >
        {(isOpen || isClosing) && (
          <div>
            <AccordionTable usersData={data.usersData} />
            <div className={`${isOpen ? "my-3 block" : "my-0 none"}`}>
              <button
                className="text-[18px] font-[500] flex items-center gap-3"
                onClick={() => modalOpenHandler("add")}
              >
                <FiPlus /> Add More
              </button>
            </div>
            {modal === "add" && (
              <Modal title="Add Sensor" onClose={modalCloseHandler}>
                <div className="flex flex-col gap-2">
                  <Input
                    type="text"
                    placeholder="Sensor Name"
                    // className="bg-[#FFFFFF] border-[1px] border-[#00000040] p-3 rounded-[10px]"
                    value={newSensorName}
                    onChange={(e) => setNewSensorName(e.target.value)}
                  />
                  <Button
                    onClick={submitHandler}
                    text="Submit"
                    width="w-full"
                  />
                </div>
              </Modal>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
