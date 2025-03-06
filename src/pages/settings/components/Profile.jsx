/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import profileImage from "../../../assets/profile.svg";
import Modal from "../../../components/modals/Modal";
import Button from "../../../components/shared/button/Button";
import Input from "../../../components/shared/input/Input";
import Dropdown from "../../../components/shared/dropdown/Dropdown";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetMyProfileQuery,
  useUpdateMyProfileMutation,
} from "../../../services/auth/authApi";
import toast from "react-hot-toast";
import { userExist, userNotExist } from "../../../services/auth/authSlice";

const genderOptions = [
  { value: "male", option: "Male" },
  { value: "female", option: "Female" },
  { value: "other", option: "Other" },
];

const Profile = () => {
  const addImageRef = useRef();
  const dispatch = useDispatch();
  const { data, error, refetch } = useGetMyProfileQuery();
  const [isNotEditAble, setIsNotEdit] = useState(true);
  const [updateProfile, { isLoading }] = useUpdateMyProfileMutation();
  const { user } = useSelector((state) => state.auth);
  const [userProfile, setUserProfile] = useState({
    image: "",
    profileImage: "",
    fullName: "",
    email: "",
    phoneNumber: "",
    dob: "",
    nationality: "",
    gender: "",
  });

  const onFileChangeHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setUserProfile({
        ...userProfile,
        image: file,
        profileImage: reader.result,
      });
    };
  };

  const updateProfileHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullName", userProfile?.fullName);
    formData.append("email", userProfile?.email);
    formData.append("phoneNumber", userProfile?.phoneNumber);
    formData.append("dob", userProfile?.dob);
    formData.append("nationality", userProfile?.nationality);
    formData.append("gender", userProfile?.gender);
    formData.append("file", userProfile?.image);
    try {
      const res = await updateProfile(formData).unwrap();
      if (res?.success) {
        toast.success(res?.message);
        setIsNotEdit(true);
        await refetch();
      }
    } catch (error) {
      toast.error(error?.data?.message || "Error occurred");
      console.log("Error in updateProfileHandler", error);
    }
  };

  // useEffect(() => {
  //   if (data && data?.data) dispatch(userExist(data?.data));
  //   if (error) dispatch(userNotExist());
  // }, [data, dispatch, error]);

  useEffect(() => {
    if (user) {
      setUserProfile({
        profileImage: user?.image?.url || "",
        fullName: user?.fullName,
        email: user?.email,
        phoneNumber: user?.phoneNumber,
        dob: user?.dob,
        nationality: user?.nationality,
        gender: user?.gender,
      });
    }
  }, [user]);

  return (
    <>
      <div
        className="bg-white flex items-center justify-between flex-col lg:flex-row rounded-[15px] mt-4 p-4 border-[1px] border-[#00000025]"
        style={{
          boxShadow:
            "-1px 1px 2px rgba(0, 0, 0, 0.1), 2px 1px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-start gap-6 w-full">
          <img
            onClick={() => addImageRef.current.click()}
            src={userProfile?.profileImage}
            alt="DP"
            className="cursor-pointer w-24 h-24 object-cover rounded-full"
          />
          <input
            ref={isNotEditAble ? null : addImageRef}
            type="file"
            className="hidden"
            onChange={onFileChangeHandler}
          />
          <div className="text-center lg:text-left">
            <h3 className="text-lg font-semibold">{userProfile?.fullName}</h3>
            <p className="text-[18px] py-2">{userProfile?.email}</p>
          </div>
        </div>
      </div>

      <div
        className="bg-white flex justify-between flex-col lg:flex-row items-start rounded-[15px] mt-4 p-4 gap-4 border-[1px] border-[#00000025]"
        style={{
          boxShadow:
            "-1px 1px 2px rgba(0, 0, 0, 0.1), 2px 1px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div className="grid grid-cols-1 gap-4 w-full">
          <Input
            type="text"
            disabled={isNotEditAble}
            readOnly={isNotEditAble}
            placeholder="Full Name"
            value={userProfile?.fullName}
            onChange={(e) =>
              setUserProfile({ ...userProfile, fullName: e.target.value })
            }
          />
          <Input
            type="text"
            disabled
            readOnly
            placeholder="Email"
            value={userProfile?.email}
          />
        </div>
      </div>

      <div
        className="bg-white flex justify-between flex-col lg:flex-row items-start rounded-[15px] mt-4 p-4 gap-4 border-[1px] border-[#00000025]"
        style={{
          boxShadow:
            "-1px 1px 2px rgba(0, 0, 0, 0.1), 2px 1px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div className="grid grid-cols-1 gap-4 w-full">
          <Input
            type="number"
            disabled={isNotEditAble}
            readOnly={isNotEditAble}
            placeholder="Phone number"
            value={userProfile?.phoneNumber}
            onChange={(e) =>
              setUserProfile({ ...userProfile, phoneNumber: e.target.value })
            }
          />
          <Input
            type="date"
            disabled={isNotEditAble}
            readOnly={isNotEditAble}
            placeholder="Date of Birth"
            value={userProfile?.dob}
            onChange={(e) =>
              setUserProfile({ ...userProfile, dob: e.target.value })
            }
          />
        </div>
      </div>

      <div
        className="bg-white flex justify-between flex-col lg:flex-row items-start rounded-[15px] mt-4 p-4 gap-4 border-[1px] border-[#00000025]"
        style={{
          boxShadow:
            "-1px 1px 2px rgba(0, 0, 0, 0.1), 2px 1px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div className="grid grid-cols-1 gap-4 w-full">
          <Input
            type="text"
            readOnly={isNotEditAble}
            disabled={isNotEditAble}
            placeholder="Nationality"
            value={userProfile?.nationality}
            onChange={(e) =>
              setUserProfile({ ...userProfile, nationality: e.target.value })
            }
          />

          <Dropdown
            disabled={isNotEditAble}
            placeholder="Gender"
            defaultText={userProfile?.gender}
            value={userProfile?.gender}
            options={genderOptions}
            onChange={(e) =>
              setUserProfile({ ...userProfile, gender: e.value })
            }
          />
        </div>
      </div>

      <div className="flex justify-center lg:justify-end w-full mt-5">
        {isNotEditAble ? (
          <Button
            onClick={() => setIsNotEdit(false)}
            text="Edit"
            width="md:w-[120px] w-full"
          />
        ) : (
          <div className="flex gap-4">
            <Button
              onClick={() => setIsNotEdit(true)}
              text="Cancel"
              width="md:w-[120px] w-full"
            />
            <Button
              disabled={isLoading}
              onClick={updateProfileHandler}
              text={isLoading ? "Saving..." : "Save"}
              width="md:w-[120px] w-full"
            />
          </div>
        )}
      </div>
    </>
  );
};
export default Profile;
