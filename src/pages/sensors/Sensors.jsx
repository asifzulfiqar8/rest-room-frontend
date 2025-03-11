import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { FiPlus } from "react-icons/fi";
import { IoEye } from "react-icons/io5";
import { RiDeleteBin6Fill, RiEditBoxFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import DeleteConfirmation from "../../components/modals/DeleteConfirmation";
import Modal from "../../components/modals/Modal";
import {
  useGetAllSensorsQuery,
  useUpdateSingleSensorMutation,
} from "../../services/sensor/sensorApi";
import AddSensor from "./AddSensor";
import EditSensor from "./EditSensor";
import ToggleButton from "../../components/shared/ToggleButton";
import toast from "react-hot-toast";

const columns = (modalOpenHandler, handleStatusToggle) => [
  {
    name: "Sensor Name",
    selector: (row) => row?.name,
  },
  {
    name: "IP",
    selector: (row) => row?.ip,
  },
  {
    name: "Port",
    selector: (row) => row?.port,
  },
  {
    name: "Type",
    selector: (row) => row?.type,
  },
  {
    name: "Unique Id",
    selector: (row) => row?.uniqueId,
  },
  {
    name: "Status",
    selector: (row) => (
      <ToggleButton
        isChecked={row.status}
        onToggle={() => handleStatusToggle(row._id, row?.status)}
      />
    ),
  },
  {
    name: "Action",
    selector: (row) => (
      <div className="flex items-center gap-3">
        <Link to={`/view-sensor`}>
          <div className="cursor-pointer">
            <IoEye fontSize={23} />
          </div>
        </Link>

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

const Sensors = () => {
  const { data, isLoading, refetch } = useGetAllSensorsQuery();
  const [updateSensor] = useUpdateSingleSensorMutation();
  const [modal, setModal] = useState(null);
  const [sensors, setSensors] = useState([]);
  const [selectedSensor, setSelectedSensor] = useState(null);

  console.log("data", data);

  const handleStatusToggle = async (id, status) => {
    try {
      console.log("sensor", id, status);
      const res = await updateSensor({
        sensorId: id,
        data: { status: !status },
      }).unwrap();
      if (res?.success) {
        await refetch();
        toast.success(res?.message || "Sensor status updated successfully");
      }
    } catch (error) {
      console.log("Error while updating sensor status", error);
      toast.error(error?.data?.message || "Error while updating sensor status");
    }
  };

  const modalOpenHandler = (type, sensor) => {
    setModal(type);
    setSelectedSensor(sensor);
  };

  const modalCloseHandler = () => {
    setModal(null);
    setSelectedSensor(null);
  };

  useEffect(() => {
    let sensorsData = data?.data;
    if (sensorsData?.length) setSensors(sensorsData);
  }, [data]);
  return (
    <div className="parentContainer animate-slide-up">
      <div className="piechart p-4 rounded-[15px] lg:p-6 h-[calc(100vh-80px)] overflow-hidden">
        <div className="flex items-center justify-between">
          <div></div>
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
            columns={columns(modalOpenHandler, handleStatusToggle)}
            data={sensors}
            selectableRows
            selectableRowsHighlight
            customStyles={tableStyles}
            pagination
            fixedHeader
            fixedHeaderScrollHeight="70vh"
          />
        </div>
        {modal === "add" && (
          <Modal title="Add Sensor" onClose={modalCloseHandler}>
            <AddSensor
              onClose={modalCloseHandler}
              refetch={refetch}
              onAdd={(newSensor) => setSensors([...sensors, newSensor])}
            />
          </Modal>
        )}
        {modal === "edit" && (
          <Modal title="Edit Sensor" onClose={modalCloseHandler}>
            <EditSensor
              selectedSensor={selectedSensor}
              onClose={modalCloseHandler}
              refetch={refetch}
              onEdit={(updatedSensor) =>
                setSensors(
                  sensors.map((s) =>
                    s.id === updatedSensor.id ? updatedSensor : s
                  )
                )
              }
            />
          </Modal>
        )}
        {modal === "delete" && (
          <Modal title="Confirmation!" onClose={modalCloseHandler}>
            <DeleteConfirmation
              selectedSensor={selectedSensor}
              onClose={modalCloseHandler}
              refetch={refetch}
              message="Are you sure you want to delete this sensor?"
              onDelete={() => {
                setSensors(sensors.filter((s) => s.id !== selectedSensor.id));
                modalCloseHandler();
              }}
            />
          </Modal>
        )}
      </div>
    </div>
  );
};

export default Sensors;

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
      margin: "10px 0",
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
