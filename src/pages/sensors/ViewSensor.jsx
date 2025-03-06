// import { useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";

// import React from "react";
// import LineChart from "../../components/charts/areaChart/LineChart";

// import { RiEdit2Fill } from "react-icons/ri";
// import { RiDeleteBin6Fill } from "react-icons/ri";
// import EditSensor from "./EditSensor";
// import Modal from "../../components/modals/Modal";

// const ViewSensor = () => {
//   const [open, setOpen] = useState(false);

//   const navigate = useNavigate();

//   // get id
//   const { id } = useParams();
//   const [modal, setModal] = useState(false);
//   // const navigate = useNavigate();

//   const modalOpenHandler = (modalType) => setModal(modalType);
//   const modalCloseHandler = () => setModal(false);

//   const handleOpenEditComponent = () => setOpen(true);
//   const handleChange = (event) => {
//     const { name, checked } = event.target;
//     // dispatch(setSensorStatus({ uniqueId: name, status: checked }));
//   };

//   const handleDeleteSensor = async () => {
//     try {
//       await deleteSensor(id).unwrap();
//       navigate("/dashboard/sensors");
//     } catch (err) {
//       console.error("Failed to delete sensor:", err);
//     }
//   };

//   const handleClose = () => setOpen(false);

//   return (
//     <div className="parentContainer">
//       <div className=" piechart rounded-lg p-8">
//         <div className="flex justify-between items-center">
//           <h2 className="text-2xl font-semibold">Sensor Detail</h2>
//           <div className="flex gap-4">
//             {/* <EditIcon
//             className="h-6 w-6 text-purple-600 cursor-pointer"
//             onClick={handleOpenEditComponent}
//           /> */}
//             <div
//               onClick={() => modalOpenHandler("edit")}
//               className="cursor-pointer"
//             >
//               <RiEdit2Fill fontSize={25} />
//             </div>
//             <RiDeleteBin6Fill fontSize={25} style={{ color: "#FF0000" }} />
//             {/* <DeleteIcon
//             className="h-6 w-6 text-purple-600 cursor-pointer"
//             onClick={handleDeleteSensor}
//           /> */}
//           </div>
//         </div>

//         <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
//           <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mt-4">
//             <div className="flex flex-col bg-white p-4 rounded-lg  border-[#00000025] border-[1px] h-full">
//               <h3 className=" text-[#A449EB] text-[16px] font-[600] leading-[32px] ">
//                 Basic Sensor Information
//               </h3>
//               <div
//                 style={{ boxShadow: "0 1px 4px rgba(0, 0, 0, 0.25)" }}
//                 className="flex justify-between items-center  mt-2 rounded-md p-3"
//               >
//                 <span className="text-gray-500">Sensor Name</span>
//                 <span className="text-purple-600 font-medium">Water Usage</span>
//               </div>
//               <div
//                 style={{ boxShadow: "0 1px 4px rgba(0, 0, 0, 0.25)" }}
//                 className="flex justify-between items-center  mt-2 rounded-md p-3"
//               >
//                 <span className="text-gray-500">Type</span>
//                 <span className="text-purple-600 font-medium">Occupancy</span>
//               </div>
//               <div
//                 style={{ boxShadow: "0 1px 4px rgba(0, 0, 0, 0.25)" }}
//                 className="flex justify-between items-center  mt-2 rounded-md p-3"
//               >
//                 <span className="text-gray-500">Location</span>
//                 <span className="text-purple-600 font-medium">
//                   Restroom 101, Floor 2
//                 </span>
//               </div>
//             </div>
//             <div className="flex flex-col bg-white p-4 rounded-lg  border-[#00000025] border-[1px] h-full">
//               <h3 className=" text-[#A449EB] text-[16px] font-[600] leading-[32px] ">
//                 Status and Data
//               </h3>
//               <div
//                 style={{ boxShadow: "0 1px 4px rgba(0, 0, 0, 0.25)" }}
//                 className="flex justify-between items-center  mt-2 rounded-md p-3"
//               >
//                 <span className="text-gray-500">Status</span>
//                 <span className="text-purple-600 font-medium">Active</span>
//               </div>
//               <div
//                 style={{ boxShadow: "0 1px 4px rgba(0, 0, 0, 0.25)" }}
//                 className="flex justify-between items-center  mt-2 rounded-md p-3"
//               >
//                 <span className="text-gray-500">Battery</span>
//                 <span className="text-purple-600 font-medium">90%</span>
//               </div>
//               <div
//                 style={{ boxShadow: "0 1px 4px rgba(0, 0, 0, 0.25)" }}
//                 className="flex justify-between items-center  mt-2 rounded-md p-3"
//               >
//                 <span className="text-gray-500">Last Update</span>
//                 <span className="text-purple-600 font-medium">
//                   10:15 AM, 22-Jul-2024
//                 </span>
//               </div>
//             </div>
//             <div className="flex flex-col bg-white p-4 rounded-lg  border-[#00000025] border-[1px] h-full">
//               <h3 className=" text-[#A449EB] text-[16px] font-[600] leading-[32px] ">
//                 Sensor-Specific Information
//               </h3>
//               <div
//                 style={{ boxShadow: "0 1px 4px rgba(0, 0, 0, 0.25)" }}
//                 className="flex justify-between items-center  mt-2 rounded-md p-3"
//               >
//                 <span className="text-gray-500">Current Occupancy</span>
//                 <span className="text-purple-600 font-medium">03</span>
//               </div>
//               <div
//                 style={{ boxShadow: "0 1px 4px rgba(0, 0, 0, 0.25)" }}
//                 className="flex justify-between items-center  mt-2 rounded-md p-3"
//               >
//                 <span className="text-gray-500">Peak Occupancy</span>
//                 <span className="text-purple-600 font-medium">10</span>
//               </div>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mt-4">
//             <div className="bg-white  rounded-lg border-[#00000025] border-[1px]">
//               <h3 className="p-4 text-[#A449EB] text-[16px] font-[600] leading-[32px] ">
//                 Historical Data
//               </h3>

//               <LineChart show={false} />
//             </div>

//             <div className="bg-white p-4 rounded-lg border-[#00000025] border-[1px]">
//               <h3 className=" text-[#A449EB] text-[16px] font-[600] leading-[32px] ">
//                 Alert History
//               </h3>
//               {/* {error ? ( */}
//               <div className="flex flex-col mt-4">
//                 {/* Replace with actual alert data */}
//                 <div className="flex justify-between bg-[#ECE8FF] rounded-md p-3 mb-2">
//                   <span className="text-[#B4B4B4]">22 May 2024</span>
//                   <span className="text-black">Water Usage</span>
//                   <span className="text-[#A449EB] font-[600] ">
//                     Floor-2 Laundry Area
//                   </span>
//                 </div>
//               </div>
//               {/* ) : ( */}
//               <div className="text-center mt-4 text-gray-500">
//                 No alerts found
//               </div>
//               {/* )} */}
//             </div>
//           </div>
//         </div>
//       </div>
//       {modal === "edit" && (
//         <Modal title="Edit Sensor" onClose={modalCloseHandler}>
//           <EditSensor onClose={modalCloseHandler} />
//         </Modal>
//       )}
//     </div>
//   );
// };

// export default ViewSensor;

//get single sensor

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LineChart from "../../components/charts/areaChart/LineChart";
import { RiEdit2Fill, RiDeleteBin6Fill } from "react-icons/ri";
import EditSensor from "./EditSensor";
import Modal from "../../components/modals/Modal";

const ViewSensor = () => {
  const [sensorData, setSensorData] = useState(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const [modal, setModal] = useState(false);

  const modalOpenHandler = (modalType) => setModal(modalType);
  const modalCloseHandler = () => setModal(false);

  // useEffect(() => {
  //   const getSensorData = async () => {
  //     try {
  //       const response = await getSensorById(id);
  //       console.log("Fetched Sensor Data:", response);
  //       if (response.success) {
  //         setSensorData(response.sensor);
  //       } else {
  //         console.error("Failed to fetch sensor data:", response.Message);
  //       }
  //     } catch (error) {
  //       console.error("Failed to fetch sensor data:", error);
  //     }
  //   };

  //   getSensorData();
  // }, [id]);

  const handleDeleteSensor = async () => {
    try {
      await deleteSensor(id);
      navigate("/home/sensor");
    } catch (err) {
      console.error("Failed to delete sensor:", err);
    }
  };

  return (
    <div className="parentContainer">
      <div className=" piechart rounded-lg p-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Sensor Detail</h2>
          <div className="flex gap-4">
            <div
              onClick={() => modalOpenHandler("edit")}
              className="cursor-pointer"
            >
              <RiEdit2Fill fontSize={25} />
            </div>
            <div onClick={handleDeleteSensor} className="cursor-pointer">
              <RiDeleteBin6Fill fontSize={25} style={{ color: "#FF0000" }} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mt-4">
            <div className="flex flex-col bg-white p-4 rounded-lg border-[#00000025] border-[1px] h-full">
              <h3 className="text-[#A449EB] text-[16px] font-[600] leading-[32px]">
                Basic Sensor Information
              </h3>
              <div
                style={{ boxShadow: "0 1px 4px rgba(0, 0, 0, 0.25)" }}
                className="flex justify-between items-center mt-2 rounded-md p-3"
              >
                <span className="text-gray-500">Sensor Name</span>
                <span className="text-purple-600 font-medium">Water Usage</span>
              </div>
              <div
                style={{ boxShadow: "0 1px 4px rgba(0, 0, 0, 0.25)" }}
                className="flex justify-between items-center mt-2 rounded-md p-3"
              >
                <span className="text-gray-500">Type</span>
                <span className="text-purple-600 font-medium">Occupancy</span>
              </div>
              <div
                style={{ boxShadow: "0 1px 4px rgba(0, 0, 0, 0.25)" }}
                className="flex justify-between items-center mt-2 rounded-md p-3"
              >
                <span className="text-gray-500">Location</span>
                <span className="text-purple-600 font-medium">
                  Restroom 01, Floor 2
                </span>
              </div>
              <div
                style={{ boxShadow: "0 1px 4px rgba(0, 0, 0, 0.25)" }}
                className="flex justify-between items-center mt-2 rounded-md p-3"
              >
                <span className="text-gray-500">IP Address</span>
                <span className="text-purple-600 font-medium">192.168.1.1</span>
              </div>
              <div
                style={{ boxShadow: "0 1px 4px rgba(0, 0, 0, 0.25)" }}
                className="flex justify-between items-center mt-2 rounded-md p-3"
              >
                <span className="text-gray-500">Port</span>
                <span className="text-purple-600 font-medium">564</span>
              </div>
              <div
                style={{ boxShadow: "0 1px 4px rgba(0, 0, 0, 0.25)" }}
                className="flex justify-between items-center mt-2 rounded-md p-3"
              >
                <span className="text-gray-500">URL</span>
                <span className="text-purple-600 font-medium">sensor.here</span>
              </div>
            </div>

            <div className="flex flex-col bg-white p-4 rounded-lg border-[#00000025] border-[1px] h-full">
              <h3 className="text-[#A449EB] text-[16px] font-[600] leading-[32px]">
                Status and Data
              </h3>
              <div
                style={{ boxShadow: "0 1px 4px rgba(0, 0, 0, 0.25)" }}
                className="flex justify-between items-center mt-2 rounded-md p-3"
              >
                <span className="text-gray-500">Status</span>
                <span className="text-purple-600 font-medium">Active</span>
              </div>
              <div
                style={{ boxShadow: "0 1px 4px rgba(0, 0, 0, 0.25)" }}
                className="flex justify-between items-center mt-2 rounded-md p-3"
              >
                <span className="text-gray-500">Unique ID</span>
                <span className="text-purple-600 font-medium">12345</span>
              </div>
              <div
                style={{ boxShadow: "0 1px 4px rgba(0, 0, 0, 0.25)" }}
                className="flex justify-between items-center mt-2 rounded-md p-3"
              >
                <span className="text-gray-500">Connection Status</span>
                <span className="text-purple-600 font-medium">
                  {/* {sensorData.isConnected ? "Connected" : "Disconnected"} */}
                  Connected
                </span>
              </div>
            </div>

            {/* Historical data and alerts section */}
            <div className="flex flex-col bg-white p-4 rounded-lg border-[#00000025] border-[1px] h-full">
              <h3 className="text-[#A449EB] text-[16px] font-[600] leading-[32px]">
                Historical Data
              </h3>
              <LineChart show={true} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mt-4">
            <div className="bg-white p-4 rounded-lg border-[#00000025] border-[1px]">
              <h3 className="text-[#A449EB] text-[16px] font-[600] leading-[32px]">
                Alert History
              </h3>
              {/* <div className="flex flex-col mt-4">
                {sensorData.alerts && sensorData.alerts.length > 0 ? (
                  sensorData.alerts.map((alert, index) => (
                    <div
                      key={index}
                      className="flex justify-between bg-[#ECE8FF] rounded-md p-3 mb-2"
                    >
                      <span className="text-[#B4B4B4]">{alert.date}</span>
                      <span className="text-black">{alert.message}</span>
                      <span className="text-[#A449EB] font-[600] ">
                        {alert.location}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="text-center mt-4 text-gray-500">
                    No alerts found
                  </div>
                )}
              </div> */}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {open && (
        <Modal onClose={handleClose}>
          <EditSensor id={id} onClose={handleClose} />
        </Modal>
      )}
    </div>
  );
};

export default ViewSensor;
