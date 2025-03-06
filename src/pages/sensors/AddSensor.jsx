/* eslint-disable react/prop-types */
import { useState } from "react";
import toast from "react-hot-toast";
import Input from "../../components/shared/input/Input";
import Button from "../../components/shared/button/Button";
import { useAddNewSensorMutation } from "../../services/sensor/sensorApi";

const AddSensor = ({ onClose, refetch }) => {
  const [addSensor, { isLoading }] = useAddNewSensorMutation();
  const [addSensorData, setAddSensorData] = useState({
    sensorName: "",
    type: "",
    ip: "",
    uniqueId: "",
    port: "",
    url: "",
    location: "",
  });

  const handleSensorChange = (e) => {
    const { name, value } = e.target;
    setAddSensorData({ ...addSensorData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { sensorName, type, ip, uniqueId, port, url } = addSensorData;
      if (!sensorName || !type || !ip || !uniqueId || !port || !url)
        toast.error("Please provide all fields");
      const data = { name: sensorName, type, uniqueId, ip, port, url };
      const response = await addSensor(data).unwrap();
      toast.success(response?.message);
      await refetch();
      onClose();
    } catch (error) {
      console.log("Error response:", error);
      toast.error(error?.data?.message || "Error Occurred");
    }

    setAddSensorData({
      sensorName: "",
      type: "",
      ipAddress: "",
      uniqueId: "",
      port: "",
      url: "",
      location: "",
    });
  };

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
              onChange={handleSensorChange}
              value={addSensorData.sensorName}
              required
            />
          </div>
          <div className="flex flex-col w-[100%] ">
            <Input
              label="Type"
              type="text"
              placeholder="Type"
              name="type"
              onChange={handleSensorChange}
              value={addSensorData.type}
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
              onChange={handleSensorChange}
              value={addSensorData.ip}
              required
            />
          </div>
          <div className="flex flex-col w-[100%] ">
            <Input
              label="Port"
              type="text"
              placeholder="Port"
              name="port"
              onChange={handleSensorChange}
              value={addSensorData.port}
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
              onChange={handleSensorChange}
              value={addSensorData.url}
              required
            />
          </div>
          <div className="flex flex-col w-[100%] ">
            <Input
              label="Location"
              type="text"
              placeholder="location"
              name="location"
              onChange={handleSensorChange}
              value={addSensorData.location}
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
            onChange={handleSensorChange}
            value={addSensorData.uniqueId}
            required
          />
        </div>
        <div className="flex justify-end gap-2">
          <Button text="Cancel" onClick={onClose} />

          <Button disabled={isLoading} type="submit" text="Add" />
        </div>
      </div>
    </form>
  );
};

export default AddSensor;
