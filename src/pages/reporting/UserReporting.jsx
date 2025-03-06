import DataTable from "react-data-table-component";
import { FiPlus } from "react-icons/fi";

import { sensorData } from "../sensors/sensor";
import restroom from "../../assets/images/sensor/restroom.svg";
import sensor from "../../assets/images/sensor/sensor.svg";
import issue from "../../assets/images/sensor/issue.svg";
import detected from "../../assets/images/sensor/detected.svg";
import resolution from "../../assets/images/sensor/resolution.svg";

const columns = [
  {
    name: (
      <div className="flex items-center gap-2 px-7  ">
        {" "}
        <img src={restroom} />
        <p>Restroom</p>{" "}
      </div>
    ),
    selector: (row) => (
      <div className="flex items-center gap-3 ">
        <img src={row.icon} alt="Sensor Icon" />
        <div className="flex flex-col">
          <span className="text-sm">{row.time}</span>
          <span className="text-lg">{row.name}</span>
          <span className="text-sm text-gray-500">{row.restRoom}</span>
        </div>
      </div>
    ),
  },
  {
    name: "",
    selector: (row) => (
      <button
        className={`border ${
          row.status === "active"
            ? "border-green-500 text-green-500"
            : "border-red-500 text-red-500"
        } text-sm px-3 py-1 rounded-full w-[90px]`}
      >
        {row.status}
      </button>
    ),
  },
  {
    name: (
      <div className="flex items-center gap-2  ">
        {" "}
        <img src={sensor} />
        <p>Sensor</p>{" "}
      </div>
    ),
    selector: (row) => (
      <div className="flex items-center gap-2">
        <img src={row.odorSensor} alt="Odor Sensor" />

        <div className="flex flex-col">
          <span className="text-sm">Odor Sensor</span>
          <span className="text-sm">5</span>
        </div>
      </div>
    ),
  },
  {
    name: (
      <div className="flex items-center gap-2  ">
        {" "}
        <img src={issue} />
        <p>Issue</p>{" "}
      </div>
    ),
    selector: (row) => (
      <div className="flex items-center gap-2">
        <img src={row.odorDetected} alt="Odor Detected" className="w-4 h-4" />

        <div className="flex flex-col">
          <span className="text-sm">Odor Detected</span>
          <span className="text-sm">50</span>
        </div>
      </div>
    ),
  },
  {
    name: (
      <div className="flex items-center gap-2  ">
        {" "}
        <img src={detected} />
        <p>Detected</p>{" "}
      </div>
    ),
    selector: (row) => (
      <div className="flex items-center gap-2">
        <img src={row.timeIcon} alt="Time Icon" className="w-4 h-4" />

        <div className="flex flex-col">
          <span className="text-sm text-[#6D6D6D]">Detected at</span>
          <span className="text-sm">{row.time}</span>
        </div>
      </div>
    ),
  },
  {
    name: (
      <div className="flex items-center gap-2  ">
        {" "}
        <img src={resolution} />
        <p>Resolution</p>{" "}
      </div>
    ),
    selector: (row) => (
      <button
        className={`border ${
          row.buttonText === "Resolved"
            ? "border-green-500 bg-green-500 text-white"
            : "border-orange-500 bg-orange-500 text-white"
        } px-4 py-2 rounded-md`}
      >
        {row.buttonText}
      </button>
    ),
  },
];

const UserReporting = () => {
  return (
    <div className="parentContainer ">
      <div className="piechart p-4 rounded-[15px] lg:p-6 h-[calc(100vh-80px)] overflow-hidden ">
        <div className="flex items-center justify-between ">
          <div>Sensor Overview</div>
          <div className="flex items-center gap-2">
            <div className="cursor-pointer">
              <FiPlus fontSize={22} />
            </div>
          </div>
        </div>
        <div className="mt-5">
          <DataTable
            columns={columns}
            data={sensorData}
            selectableRowsHighlight
            customStyles={tableStyles}
            pagination
            fixedHeader
            fixedHeaderScrollHeight="70vh"
            noHeader // This will remove the default header from DataTable
          />
        </div>
      </div>
    </div>
  );
};

export default UserReporting;

const tableStyles = {
  table: {
    style: {
      padding: "6px",
      border: "none",
    },
  },
  rows: {
    style: {
      boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.25)",
      borderRadius: "6px",
      marginBottom: "10px",
      padding: "15px 20px",
    },
  },
  cells: {
    style: {
      color: "rgba(17, 17, 17, 1)",
      fontSize: "14px",
    },
  },
};
