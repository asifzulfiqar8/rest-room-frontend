/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Button from "../../components/shared/button/Button";
import Modal from "../../components/modals/Modal";
import Dropdown from "../../components/shared/dropdown/Dropdown";
import Input from "../../components/shared/input/Input";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useUpdateMyProfileMutation } from "../../services/auth/authApi";

const intervalTimesInSeconds = [
  { option: "3 minutes", value: "180000" },
  { option: "2 minutes", value: "120000" },
  { option: "1 minutes", value: "60000" },
  { option: "10 seconds", value: "10000" },
  { option: "30 seconds", value: "30000" },
  { option: "5 seconds", value: "5000" },
];

const Configuration = ({ refetch }) => {
  const { user } = useSelector((state) => state.auth);
  const [updateProfile, { isLoading }] = useUpdateMyProfileMutation();

  const [modal, setModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Local Database");
  const [timeInterValText, setTimeInterValText] = useState("3 minutes");
  const [pendingOption, setPendingOption] = useState("");
  const [formValues, setFormValues] = useState({
    timeInterval: "",
    dbName: "",
    portNumber: "",
    userName: "",
    password: "",
    hostName: "",
  });

  const modalOpenHandler = () => setModal(true);
  const modalCloseHandler = () => setModal(false);
  const handleRadioChange = (event) => {
    setPendingOption(event.target.value);
    modalOpenHandler();
  };
  const handleConfirmChange = () => {
    setSelectedOption(pendingOption);
    modalCloseHandler();
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formValues);
    try {
      const formData = new FormData();
      if (selectedOption === "Remote Database") {
        if (
          !formValues?.dbName ||
          !formValues?.portNumber ||
          !formValues?.userName ||
          !formValues?.password ||
          !formValues?.hostName
        )
          return toast.error("Please fill all the fields of local database");
        formData.append("isCustomDb", "true");
        formData.append("customDbHost", formValues.hostName);
        formData.append("customDbPort", formValues.portNumber);
        formData.append("customDbUsername", formValues.userName);
        formData.append("customDbPassword", formValues.password);
        formData.append("customDbName", formValues.dbName);
      }
      if (selectedOption === "Local Database") formData.append("isCustomDb", "false");
      formData.append("interval", formValues.timeInterval);

      const response = await updateProfile(formData).unwrap();
      if (response?.success) {
        toast.success(response?.message);
        await refetch();
      }
    } catch (error) {
      toast.error(error?.data?.message || "Error while updating profile");
      console.log("Error while updating profile", error);
    }
  };

  useEffect(() => {
    if (user) {
      const interval = intervalTimesInSeconds.find((item) => item.value == user?.interval);
      setSelectedOption(user?.isCustomDb ? "Remote Database" : "Local Database");
      setTimeInterValText(interval?.option);
      setFormValues({
        hostName: user?.customDbHost || "",
        portNumber: user?.customDbPort || "",
        userName: user?.customDbUsername || "",
        password: user?.customDbPassword || "",
        dbName: user?.customDbName || "",
        timeInterval: user?.interval || "",
      });
    }
  }, [user]);
  return (
    <div className="bg-white rounded-[15px] p-4 lg:p-6 mt-4">
      <h3 className="text-lg md:text-xl font-[500] mb-4">
        Pull Request Intervals
      </h3>
      <form onSubmit={handleSubmit}>
        <div className="pl-0 md:pl-8 mt-4 md:mt-6">
          <Dropdown
            label="Select Time Intervals"
            defaultText={timeInterValText || "Select Time Intervals"}
            options={intervalTimesInSeconds}
            onSelect={(option) =>
              setFormValues((prevValues) => ({
                ...prevValues,
                timeInterval: option,
              }))
            }
          />

          <h3 className="text-sm md:text-base font-medium mb-2 mt-4 md:mt-6">
            Database Type
          </h3>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-1 text-sm">
              <input
                type="radio"
                name="database"
                value="Local Database"
                onChange={handleRadioChange}
                checked={selectedOption === "Local Database"}
              />
              Local Database
            </label>
            <label className="flex items-center gap-1 text-sm">
              <input
                type="radio"
                name="database"
                value="Remote Database"
                onChange={handleRadioChange}
                checked={selectedOption === "Remote Database"}
              />
              Remote Database
            </label>
          </div>
          <div className="mt-4">
            {selectedOption === "Remote Database" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                <div className="lg:col-span-6">
                  <Input
                    type="number"
                    placeholder="Port Number"
                    value={formValues.portNumber}
                    name="portNumber"
                    onChange={handleChange}
                  />
                </div>
                <div className="lg:col-span-6">
                  <Input
                    type="text"
                    placeholder="Host Name"
                    value={formValues.hostName}
                    name="hostName"
                    onChange={handleChange}
                  />
                </div>
                <div className="lg:col-span-6">
                  <Input
                    type="text"
                    placeholder="Database Name"
                    name="dbName"
                    onChange={handleChange}
                    value={formValues.dbName}
                  />
                </div>
                <div className="lg:col-span-6">
                  <Input
                    type="text"
                    placeholder="Username"
                    value={formValues.userName}
                    name="userName"
                    onChange={handleChange}
                  />
                </div>
                <div className="lg:col-span-12">
                  <Input
                    type="password"
                    placeholder="Password"
                    value={formValues.password}
                    name="password"
                    onChange={handleChange}
                  />
                </div>
              </div>
            )}
          </div>
          <div className="flex justify-end mt-4">
            <Button
              disabled={isLoading}
              text="Save"
              width="w-[150px]"
              type="submit"
            />
          </div>
        </div>
      </form>
      {modal && (
        <Modal
          onClose={modalCloseHandler}
          title="Database Storage Confirmation"
          width="w-[320px] md:w-[450px]"
        >
          <ConfirmationModal
            onClose={modalCloseHandler}
            onConfirm={handleConfirmChange}
          />
        </Modal>
      )}
    </div>
  );
};

export default Configuration;

const ConfirmationModal = ({ onClose, onConfirm }) => {
  return (
    <div>
      <h6 className="text-sm md:text-base text-gray-400 font-medium">
        Do you want to store your data in a local database?
      </h6>
      <div className="mt-12 flex justify-end">
        <div className="flex flex-wrap items-center gap-4">
          <Button
            bg="text-[#A449EB] border-[#A449EB] border-[1px] bg-transparent hover:bg-[#A449EB] hover:text-white"
            text="Cancel"
            width="w-[120px]"
            onClick={onClose}
          />
          <Button text="Change" width="w-[120px]" onClick={onConfirm} />
        </div>
      </div>
    </div>
  );
};
