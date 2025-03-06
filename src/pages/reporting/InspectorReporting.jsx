import DataTable from "react-data-table-component";
import { FiPlus } from "react-icons/fi";
import restroom from "../../assets/images/sensor/restroom.svg";
import profile from "../../assets/profile.svg";
import warning from "../../assets/images/sensor/warning.svg";
import building from "../../assets/images/sensor/building.svg";
import date from "../../assets/images/sensor/date.svg";
import { sensorData } from "../sensors/sensor";
import CircularProgressBar from "../../components/shared/progress/CircularProgressBar";
import { IoEye } from "react-icons/io5";
import { Link } from "react-router-dom";

const columns = [
  {
    name: (
      <div className="flex items-center gap-2 px-7  ">
        {" "}
        <p>Date Of Inspection</p>
      </div>
    ),
    selector: () => (
      <div className="parentContainer ">
        <div className="piechart ">
          <div className="flex items-center gap-3 ">
            <img src={date} alt="Sensor Icon" className="w-7 h-7" />
            <div className="flex flex-col">
              <span className="text-sm">22 July 2024</span>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    name: "Building",
    selector: () => (
      <div className="flex items-center gap-2">
        <img src={building} alt="Odor Sensor" />

        <div className="flex flex-col">
          <span className="text-sm">Arfa Tower</span>
        </div>
      </div>
    ),
  },
  {
    name: (
      <div className="flex items-center gap-2  ">
        <p>Restroom</p>{" "}
      </div>
    ),
    selector: () => (
      <div className="flex items-center gap-2">
        <img src={restroom} alt="Odor Sensor" />

        <div className="flex flex-col">
          <span className="text-sm">R003</span>
        </div>
      </div>
    ),
  },
  {
    name: (
      <div className="flex items-center gap-2  ">
        <p>Inspection Officer</p>{" "}
      </div>
    ),
    selector: () => (
      <div className="flex items-center gap-2">
        <img src={profile} alt="Odor Detected" className="w-7 h-7" />

        <div className="flex flex-col">
          <span className="text-sm">Thomas James</span>
        </div>
      </div>
    ),
  },
  {
    name: (
      <div className="flex items-center gap-2  ">
        {" "}
        <p>Detected</p>{" "}
      </div>
    ),
    selector: () => (
      <div className="flex items-center gap-2">
        <img src={warning} alt="Time Icon" className="w-6 h-6" />

        <div className="flex flex-col">
          <span className="text-sm ">Reason For Inspection</span>
        </div>
      </div>
    ),
  },
  {
    name: (
      <div className="flex items-center  ">
        {" "}
        <p>Activity</p>{" "}
      </div>
    ),
    selector: () => (
      <div className="flex items-center ">
        <CircularProgressBar
          percentage={50}
          width="w-[50px]"
          percentageSize="text-[12px]"
        />
      </div>
    ),
  },

  {
    name: (
      <div className="flex items-center  ">
        {" "}
        <p></p>{" "}
      </div>
    ),
    selector: () => (
      <div
        className="flex items-center 
      "
      >
        <Link to="/inspection/all-restrooms">
          <IoEye fontSize={22} className="text-[#707070]" />
        </Link>
      </div>
    ),
  },
];

const InspectorReporting = () => {
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
            data={[sensorData[0]]}
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

export default InspectorReporting;

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
    },
  },
  cells: {
    style: {
      color: "rgba(17, 17, 17, 1)",
      fontSize: "14px",
    },
  },
};
