import DataTable from "react-data-table-component";
import { useState } from "react";
import { IoEye } from "react-icons/io5";
import { RiEditBoxFill, RiDeleteBin6Fill } from "react-icons/ri";
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import Modal from "../../../components/modals/Modal";
import AddInspector from "./components/AddInspector";
import EditInspector from "./components/EditInspector";
import DeleteConfirmation from "../../../components/modals/DeleteConfirmation";

const sensorData = [
  {
    id: 1,
    fullname: "User 1",
    email: "u1@gmail.com",
    role: "inspector",
  },
  {
    id: 2,
    fullname: "User 2",
    email: "u2@gmail.com",
    role: "supervisor",
  },
  // Add more sensor data here if needed
];

const columns = (modalOpenHandler) => [
  {
    name: "Full Name",
    selector: (row) => row.fullname,
  },
  {
    name: "Email",
    selector: (row) => row.email,
  },
  {
    name: "Role",
    selector: (row) => row.role,
  },
  {
    name: "Action",
    selector: (row) => (
      <div className="flex items-center gap-3">
        {/* <Link to="/home/view-sensor">
          <div className="cursor-pointer">
            <IoEye fontSize={23} />
          </div>
        </Link> */}
        <div
          className="cursor-pointer"
          onClick={() => modalOpenHandler("edit", row)}
        >
          <RiEditBoxFill fontSize={23} />
        </div>
        <div
          className="cursor-pointer"
          onClick={() => modalOpenHandler("delete", row)}
        >
          <RiDeleteBin6Fill fontSize={23} style={{ color: "red" }} />
        </div>
      </div>
    ),
  },
];

const Inspections = () => {
  const [modal, setModal] = useState(false);
  const [selectedSensor, setSelectedSensor] = useState(null);

  const modalOpenHandler = (modalType, row) => {
    setModal(modalType);
    setSelectedSensor(row);
  };

  const modalCloseHandler = () => setModal(false);

  return (
    <div className="parentContainer animate-slide-up">
      <div className="piechart p-4 rounded-[15px]  lg:p-6 h-[calc(100vh-80px)] overflow-hidden">
        <div className="flex items-center justify-between">
          <div>{/* Title or heading */}</div>
          <div className="flex items-center gap-2">
            <div
              className="cursor-pointer"
              onClick={() => modalOpenHandler("add")}
            >
              <FiPlus fontSize={22} />
            </div>
          </div>
        </div>
        <div className="mt-5">
          <DataTable
            columns={columns(modalOpenHandler)}
            data={sensorData}
            selectableRows
            selectableRowsHighlight
            customStyles={tableStyles}
            pagination
            fixedHeader
            fixedHeaderScrollHeight="70vh"
          />
        </div>

        {modal === "add" && (
          <Modal title="Add Inspector Officer" onClose={modalCloseHandler}>
            <AddInspector onClose={modalCloseHandler} />
          </Modal>
        )}
        {modal === "edit" && (
          <Modal title="Edit Inspector Officer" onClose={modalCloseHandler}>
            <EditInspector
              selectedSensor={selectedSensor}
              onClose={modalCloseHandler}
            />
          </Modal>
        )}

        {modal === "delete" && (
          <Modal title="Confirmation!" onClose={modalCloseHandler}>
            <DeleteConfirmation
              selectedSensor={selectedSensor}
              onClose={modalCloseHandler}
              message="Are you sure you want to delete this inspection?"
            />
          </Modal>
        )}
      </div>
    </div>
  );
};

export default Inspections;

const tableStyles = {
  headCells: {
    style: {
      fontSize: "16px",
      fontWeight: 600,
      color: "rgba(17, 17, 17, 1)",
    },
  },
  rows: {
    style: {
      background: "#ECE8FF",
      borderRadius: "6px",
      padding: "14px 0",
      margin: "4px 0",
      borderBottomWidth: "0 !important",
    },
  },
  cells: {
    style: {
      color: "rgba(17, 17, 17, 1)",
      fontSize: "14px",
    },
  },
};
