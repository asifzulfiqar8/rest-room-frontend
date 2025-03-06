import React, { useState } from "react";
import Button from "../../components/shared/button/Button";
import Modal from "../../components/modals/Modal";
import Dropdown from "../../components/shared/dropdown/Dropdown";
import Input from "../../components/shared/input/Input";

const Configuration = () => {
  const [modal, setModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Remote Cloud Database");
  const [pendingOption, setPendingOption] = useState("");
  const [formValues, setFormValues] = useState({
    timeInterval: "",
    dbName: "",
    ip: "",
    db: "",
    serverAddress: "",
    portNumber: "",
    userName: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

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

  const timeIntervalHandler = (option) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      timeInterval: option,
    }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = {};

    if (!formValues.timeInterval) {
      validationErrors.timeInterval = "Time interval is required";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        console.log("Form Values: ", formValues);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="bg-white rounded-[15px] p-4 lg:p-6 mt-4">
      <h3 className="text-lg md:text-xl font-semibold mb-4">
        Pull Request Intervals
      </h3>
      <form onSubmit={handleSubmit}>
        <div className="pl-0 md:pl-8 mt-4 md:mt-6">
          <Dropdown
            label="Select Time Intervals"
            defaultText="Select Time Interval"
            options={[
              { option: "3 minutes", value: "3 minutes" },
              { option: "5 minutes", value: "5 minutes" },
              { option: "10 minutes", value: "10 minutes" },
            ]}
            onSelect={timeIntervalHandler}
          />

          <h3 className="text-sm md:text-base font-medium mb-2 mt-4 md:mt-6">
            Database Type
          </h3>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-1 text-sm">
              <input
                type="radio"
                name="database"
                value="Remote Cloud Database"
                onChange={handleRadioChange}
                checked={selectedOption === "Remote Cloud Database"}
              />
              Remote Cloud Database
            </label>
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
          </div>
          <div className="mt-4">
            {selectedOption === "Remote Cloud Database" && (
              <div>
                <Input type="text" placeholder="Database Name" />
              </div>
            )}
            {selectedOption === "Local Database" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                <div className="lg:col-span-6">
                  <Input
                    type="text"
                    placeholder="Server Address"
                    name="serverAddress"
                  />
                  {errors.serverAddress && (
                    <div className="text-red-500 text-xs mt-1">
                      {errors.serverAddress}
                    </div>
                  )}
                </div>
                <div className="lg:col-span-6">
                  <Input type="number" placeholder="Port Number" />
                </div>
                <div className="lg:col-span-6">
                  <Input type="text" placeholder="Database Name" />
                </div>
                <div className="lg:col-span-6">
                  <Input type="text" placeholder="Username" />
                </div>
                <div className="lg:col-span-12">
                  <Input type="password" placeholder="Password" />
                </div>
              </div>
            )}
          </div>
          <div className="flex justify-end mt-4">
            <Button text="Save" width="w-[150px]" type="submit" />
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
