import { useState } from "react";
import toast from "react-hot-toast";
import Input from "../../../../components/shared/input/Input";
import Button from "../../../../components/shared/button/Button";

const ChangePassword = () => {
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { oldPassword, newPassword, confirmPassword } = passwordData;

    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match.");
      return;
    }

    const apiBody = {
      oldPassword,
      newPassword,
      confirmPassword,
    };

    try {
      const message = await changePassword(apiBody);
      if (message) {
        toast.success(message);
      }
      setPasswordData({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      toast.error("Failed to change password.");
    }
  };

  return (
    <div className="parentContainer min-h-screen">
      <div className="piechart p-4 md:p-5">
        <h3 className="text-[24px] font-[500] mb-4 xl:mb-0">Change Password</h3>
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-[15px] mt-4 p-4 gap-4"
          style={{
            boxShadow:
              "-1px 1px 2px rgba(0, 0, 0, 0.1), 2px 1px 2px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div className="grid grid-cols-1 gap-3 ">
            <Input
              onChange={handleChange}
              name="oldPassword"
              value={passwordData.oldPassword}
              placeholder="Old Password"
              type="password"
            />
            <Input
              onChange={handleChange}
              name="newPassword"
              value={passwordData.newPassword}
              placeholder="New Password"
              type="password"
            />
            <Input
              onChange={handleChange}
              name="confirmPassword"
              value={passwordData.confirmPassword}
              placeholder="Confirm Password"
              type="password"
            />
          </div>
          <div className="mt-3">
            <Button text="Change Password" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
