/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */

import toast from "react-hot-toast";
import Input from "../../../../components/shared/input/Input";
import Dropdown from "../../../../components/shared/dropdown/Dropdown";
import Button from "../../../../components/shared/button/Button";

const EditInspector = ({ onClose }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4 mt-2">
        <div className="my-1">
          <Input label="Full Name" placeholder="Full name" />
        </div>
        <div className="my-1">
          <Input label="Email" placeholder="Email" />
        </div>{" "}
        <div className="my-1">
          <Dropdown label="Role" options={[{ option: "Inspector" }]} />
        </div>
        <div className="my-1">
          <Input label="Password" placeholder="Password" />
        </div>{" "}
        <div className="flex justify-end gap-2">
          <Button text="Edit" width="w-full" />
        </div>
      </div>
    </form>
  );
};

export default EditInspector;

const Label = ({ label }) => (
  <label className="text-[#000] text-base mb-2 block font-[500]">{label}</label>
);
