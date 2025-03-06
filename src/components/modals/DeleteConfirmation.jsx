import toast from "react-hot-toast";
import Button from "../shared/button/Button";
import { useDeleteSingleSensorMutation } from "../../services/sensor/sensorApi";

const DeleteConfirmation = ({ onClose, message, selectedSensor, refetch }) => {
  const [deleteSensor] = useDeleteSingleSensorMutation();
  const handleDelete = async () => {
    if (!selectedSensor || !selectedSensor._id) {
      console.error("No sensor selected or sensor ID is undefined");
      return;
    }

    try {
      const res = await deleteSensor(selectedSensor._id);
      toast.success(res?.message || "Sensor deleted successfully!");
      refetch();
      onClose();
    } catch (error) {
      toast.error(error?.data?.message || "An error occurred while deleting.");
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <p className="text-[16px] text-[#00000090]">{message}</p>
      <div className="flex gap-2 justify-end">
        <Button
          text="Cancel"
          width="w-[100px]"
          onClick={onClose}
          bg="bg-transparent text-[#A449EB] border-[1px] border-[#A449EB] hover:text-white hover:bg-[#A449EB]"
        />

        <Button text="Yes" width="w-[100px]" onClick={handleDelete} />
      </div>
    </div>
  );
};

export default DeleteConfirmation;
