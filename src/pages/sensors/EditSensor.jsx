/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Input from "../../components/shared/input/Input";
import Button from "../../components/shared/button/Button";
import { useUpdateSingleSensorMutation } from "../../services/sensor/sensorApi";

const EditSensor = ({ selectedSensor, onClose, refetch }) => {
  const [updateSensor] = useUpdateSingleSensorMutation();
  const [editSensor, setEditSensor] = useState({
    sensorName: "",
    type: "",
    ip: "",
    uniqueId: "",
    port: "",
    url: "",
    location: "",
  });

  useEffect(() => {
    if (selectedSensor) {
      setEditSensor({
        sensorName: selectedSensor?.name || "",
        type: selectedSensor?.type || "",
        ip: selectedSensor?.ip || "",
        uniqueId: selectedSensor?.uniqueId || "",
        port: selectedSensor?.port || "",
        location: selectedSensor?.location || "",
        url: selectedSensor?.url || "",
      });
    }
  }, [selectedSensor]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditSensor((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  console.log("sensor", editSensor);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await updateSensor(selectedSensor._id, {
        name: editSensor.sensorName,
        type: editSensor.type,
        ip: editSensor.ip,
        uniqueId: editSensor.uniqueId,
        port: editSensor.port,
        url: editSensor.url,
      });
      toast.success(res?.message || " Sensor updates successfully");
      // refetch();
      onClose();
    } catch (error) {
      console.error("Failed to update sensor:", error);
      toast.error(error?.data?.message || "An error occurred while Updating.");
    }
  };

  // console.log("sensor", selectedSensor);

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4 mt-2">
        <div className="flex gap-2">
          <div className="flex flex-col w-[100%]">
            <Input
              label="Sensor Name"
              type="text"
              placeholder="Sensor Name"
              name="sensorName"
              onChange={handleChange}
              value={editSensor.sensorName}
              required
            />
          </div>
          <div className="flex flex-col w-[100%] ">
            <Input
              label="Type"
              type="text"
              placeholder="Type"
              name="type"
              onChange={handleChange}
              value={editSensor.type}
              required
            />
          </div>
        </div>
        <div className="flex gap-2">
          <div className="flex flex-col w-[100%] ">
            <Input
              label="IP"
              type="text"
              placeholder="IP"
              name="ip"
              onChange={handleChange}
              value={editSensor.ip}
              required
            />
          </div>
          <div className="flex flex-col w-[100%] ">
            <Input
              label="Port"
              type="text"
              placeholder="Port"
              name="port"
              onChange={handleChange}
              value={editSensor.port}
              required
            />
          </div>
        </div>
        <div className="flex gap-2">
          <div className="flex flex-col w-[100%] ">
            <Input
              label="URL"
              labelWeight="font-semibold"
              type="text"
              placeholder="url"
              name="url"
              onChange={handleChange}
              value={editSensor.url}
              required
            />
          </div>
        </div>

        <div className="flex flex-col w-[100%] ">
          <Input
            label="Unique Id"
            type="text"
            placeholder="Unique Id"
            name="uniqueId"
            onChange={handleChange}
            value={editSensor.uniqueId}
            required
          />
        </div>
        <div className="flex justify-end gap-2">
          <Button text="Cancel" onClick={onClose} />

          <Button type="submit" text="Update" />
        </div>
      </div>
    </form>
  );
};

export default EditSensor;
