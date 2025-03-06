import { useState } from "react";
import qr from "../../../../assets/dashboard/subComponent/qr.svg";
import buildingFloorImg from "../../../../assets/images/buildingFloorimg.png";
import { Link, useParams } from "react-router-dom";

import Modal from "../../../../components/modals/Modal";
import QRCode from "react-qr-code";
import Dropdown from "../../../../components/shared/dropdown/Dropdown";

const waterSensorStatus = [
  { title: "Total Water Points", count: 15 },
  { title: "Active Water Points", count: 10 },
  { title: "Inactive Water Points", count: 5 },
  { title: "Water Flow", count: "3 In & 2 Out" },
];

const ToiletStatus = ({data}) => {
  const id = useParams();
  const url = "https://restroom-frontend.vercel.app/home/floor";
  const options = [{option:"Toilet Sensor"}, {option:"Water Sensor"}];

  const [sensorType, setSensorType] = useState("Toilet Sensor");
  const [modal, setModal] = useState(false);

  const handleSelectOption = (option) => {
    setSensorType(option);
  };

  const modalOpenHandler = (modalType) => setModal(modalType);
  const modalCloseHandler = () => setModal(false);

  return (
    <>
      <div className="piechart p-5">
        <div className="mb-5 flex ">
          <Dropdown options={options} onSelect={handleSelectOption} />
        </div>

        {sensorType === "Toilet Sensor" ? (
          <div className="grid grid-cols-12 gap-4">
            <div className="grid col-span-12 xl:col-span-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-[#A449EB] font-semibold text-2xl">
                  Floor 1
                </h2>
                <div
                  className="cursor-pointer"
                  onClick={() => modalOpenHandler("qr")}
                >
                  <img src={qr} alt="QR Code" />
                </div>
              </div>
              <Link to="/view-sensor">
                <div className="pointer">
                  {/* NOTE : THE data i have passing in prop ,is not valid, this is behaving like static..so fix it */}
                  <img src={data?.data?.floorRoomImage} alt="Toilet Sensor" />
                </div>
              </Link>
            </div>
            <div className="grid col-span-12 xl:col-span-4">
              <div
                style={{ border: "1px solid #00000025" }}
                className="rounded-lg p-5"
              >
                <div className="flex justify-between items-center mb-5">
                  <h2 className="text-[#068F9A] text-xl font-semibold">
                    Queuing Status
                  </h2>
                  <div className="bg-[#61CA94] text-white p-2 rounded-md">
                    Small Queue
                  </div>
                </div>

                <div className="flex justify-between items-center bg-[#F6EAFF] p-3 my-2 rounded-md">
                  <p className="text-sm md:text-lg font-normal">Floor Name</p>
                  <h5 className="text-sm md:text-lg font-semibold text-primary">
                    {data?.data.floorRoomName || "12"}
                  </h5>
                </div>
                <div className="flex justify-between items-center bg-[#F6EAFF] p-3 my-2 rounded-md">
                  <p className="text-sm md:text-lg font-normal">Floor Area</p>
                  <h5 className="text-sm md:text-lg font-semibold text-primary">
                    {data?.data.floorArea || "15"}
                  </h5>
                </div>
                <div className="flex justify-between items-center bg-[#F6EAFF] p-3 my-2 rounded-md">
                  <p className="text-sm md:text-lg font-normal">Toilets</p>
                  <h5 className="text-sm md:text-lg font-semibold text-primary">
                    {data?.data?.numberOfToilets || "15"}
                  </h5>
                </div>

                <div className="flex justify-between items-center bg-[#F6EAFF] p-3 my-2 rounded-md">
                  <p className="text-sm md:text-lg font-normal">Floor Status</p>
                  <h5 className="text-sm md:text-lg font-semibold text-primary">
                    {data?.data?.floorStatus || "15"}
                  </h5>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-12 gap-4">
            <div className="grid col-span-12 xl:col-span-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-[#A449EB] font-semibold text-2xl">
                  Floor 3
                </h2>
                <div
                  onClick={() => modalOpenHandler("qr")}
                  className="cursor-pointer"
                >
                  <img src={qr} alt="QR Code" />
                </div>
              </div>
              <div>
                <img src={buildingFloorImg} alt="Water Sensor" />
              </div>
            </div>
            <div className="grid col-span-12 xl:col-span-4">
              <div
                style={{ border: "1px solid #00000025" }}
                className="rounded-lg p-5"
              >
                <div className="flex justify-between items-center mb-5">
                  <h2 className="text-[#068F9A] text-xl font-semibold">
                    Water Sensor Status
                  </h2>
                  <div className="bg-[#FFC472] text-white p-2 rounded-md">
                    Normal Flow
                  </div>
                </div>

                {waterSensorStatus.map((status, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center bg-[#F6EAFF] p-3 my-2 rounded-md"
                  >
                    <p className="text-sm md:text-lg font-normal">
                      {status.title}
                    </p>
                    <h5 className="text-sm md:text-lg font-semibold text-primary">
                      {status.count}
                    </h5>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      {modal === "qr" && (
        <Modal title="qr" onClose={modalCloseHandler}>
          <div className="bg-[#058f9a] p-5 rounded-[15px] text-[white] flex flex-col items-center gap-7">
            <h2 className="text-[32px] font-[600]">Scan QR Code</h2>
            <div>
              <QRCode
                value={url}
                size={256}
                fgColor="#000000"
                bgColor="#ffffff"
              />
            </div>
            <div className="text-center">
              <h5 className="text-[20px] font-[400] ">
                Lorem ipsum dolor sit amet consectetur. Feugiat ultricies in
                semper laoreet pellentesque turpis. Non accumsan ullamcorper non
                non est.
              </h5>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default ToiletStatus;
