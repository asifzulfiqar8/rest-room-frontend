import Input from "../../../components/shared/input/Input";
import Button from "../../../components/shared/button/Button";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { useUpdateMyProfileMutation } from "../../../services/auth/authApi";
import { toast } from "react-toastify";

const ChangePassword = () => {
  const [oldPasswordType, setOldPasswordType] = useState("text");
  const [newPasswordType, setNewPasswordType] = useState("text");
  const [confirmPasswordType, setConfirmPasswordType] = useState("text");

  const [updateProfile, { isLoading }] = useUpdateMyProfileMutation();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const changePasswordHandler = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) return toast.error("New password and confirm password do not match.");
    const formData = new FormData();
    formData.append("oldPassword", oldPassword);
    formData.append("newPassword", newPassword);
    try {
      const res = await updateProfile(formData).unwrap();
      if (res?.success) toast.success(res?.message);
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      toast.error(error?.data?.message || "Error occurred");
      console.log("Error in updateProfileHandler", error);
    }
  };

  return (
    <div className="parentContainer min-h-screen">
      <div className="piechart p-4 md:p-5">
        <h3 className="text-lg md:text-xl font-[500] mb-4 xl:mb-0">Change Password</h3>
        <form className="bg-white rounded-[15px] mt-4 p-5 gap-4 border-[2px]" onSubmit={changePasswordHandler}>
          <div className="grid grid-cols-1 gap-3">
            <Input
              type={oldPasswordType ? "password" : "text"}
              label="Old Password"
              icon={oldPasswordType ? <FaRegEyeSlash /> : <FaRegEye />}
              onIconClick={() => setOldPasswordType(!oldPasswordType)}
              placeholder="Old Password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <Input
              type={newPasswordType ? "password" : "text"}
              label="New Password"
              icon={newPasswordType ? <FaRegEyeSlash /> : <FaRegEye />}
              onIconClick={() => setNewPasswordType(!newPasswordType)}
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <Input
              type={confirmPasswordType ? "password" : "text"}
              label="Confirm New Password"
              icon={confirmPasswordType ? <FaRegEyeSlash /> : <FaRegEye />}
              onIconClick={() => setConfirmPasswordType(!confirmPasswordType)}
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="mt-3">
            <Button disabled={isLoading} text="Change Password" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
