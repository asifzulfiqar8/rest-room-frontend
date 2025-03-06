import { useEffect, useRef, useState } from "react";
// import { useCreateUserProfileMutation, useGetUserProfileQuery, useGetUserQuery } from "../../../redux/api/userApi";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Button from "../../../../components/shared/button/Button";
import Input from "../../../../components/shared/input/Input";
import {
  useGetMyProfileQuery,
  useUpdateMyProfileMutation,
} from "../../../../services/auth/authApi";
import { userExist, userNotExist } from "../../../../services/auth/authSlice";

const Profile = () => {
  const imageRef = useRef(null);
  const [userProfile, setUserProfile] = useState({
    image: "",
    profileImg: "",
    email: "",
    fullName: "",
    phoneNumber: "",
    dob: "",
    nationality: "",
    gender: "",
  });
  const [updateProfile, { isLoading }] = useUpdateMyProfileMutation();
  const { data, error, refetch } = useGetMyProfileQuery();
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [isFormEdit, setIsFormEdit] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setUserProfile({
        ...userProfile,
        image: file,
        profileImg: reader.result,
      });
    };
  };

  const userProfileChangeHandler = (e) =>
    setUserProfile({ ...userProfile, [e.target.name]: e.target.value });

  const updateProfileSaveHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullName", userProfile?.fullName);
    formData.append("email", userProfile?.email);
    formData.append("phoneNumber", userProfile?.phoneNumber);
    formData.append("dob", userProfile?.dob);
    formData.append("nationality", userProfile?.nationality);
    formData.append("gender", userProfile?.gender);

    if (userProfile?.image) {
      formData.append("file", userProfile.image);
    }

    try {
      const res = await updateProfile(formData).unwrap();
      if (res?.success) {
        toast.success(res?.message);
        setIsFormEdit(false);
        await refetch();
      }
    } catch (error) {
      toast.error(
        error?.data?.message || "Error occurred while updating profile"
      );
      console.log("Error while updating profile", error);
    }
  };

  // useEffect(() => {
  //   if (data && data?.data) dispatch(userExist(data?.data));
  //   if (error) dispatch(userNotExist());
  // }, [data, dispatch, error]);

  useEffect(() => {
    if (user) {
      setUserProfile({
        profileImg: user?.image?.url || "",
        fullName: user?.fullName || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        dob: user?.dob || "",
        nationality: user?.nationality || "",
        gender: user?.gender || "",
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
            onClick={() => imageRef.current.click()}
            src={userProfile?.profileImg}
            alt="Profile"
            className={`w-24 h-24 object-cover rounded-full ${
              !isFormEdit ? "" : "cursor-pointer"
            }`}
          />
          <div className="text-center lg:text-left">
            <input
              className={`${
                !isFormEdit
                  ? "bg-transparent border-0 px-0"
                  : "border-[1px] border-[#54545499] rounded-md px-5 py-2 text-[#414141] leading-tight focus:outline-none focus:shadow-outline pr-[2.5rem]"
              }`}
              name="fullName"
              placeholder="Phone number"
              value={userProfile?.fullName}
              readOnly={!isFormEdit}
              disabled={!isFormEdit}
              onChange={(e) => userProfileChangeHandler(e)}
            />
            <p className="text-[18px] py-2">{userProfile?.email}</p>
          </div>
        </div>
      </div>

      <input
        ref={isFormEdit ? imageRef : null}
        type="file"
        id="fileInput"
        onChange={handleFileChange}
        accept="image/*"
        readOnly={!isFormEdit}
        disabled={!isFormEdit}
        className="hidden"
      />

      <div
        className="bg-white flex justify-between flex-col lg:flex-row items-start rounded-[15px] mt-4 p-4 gap-4 border-[1px] border-[#00000025]"
        style={{
          boxShadow:
            "-1px 1px 2px rgba(0, 0, 0, 0.1), 2px 1px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div className="grid grid-cols-1 gap-4 w-full">
          <Input
            type="tel"
            name="phoneNumber"
            placeholder="Phone number"
            value={userProfile?.phoneNumber}
            readOnly={!isFormEdit}
            disabled={!isFormEdit}
            onChange={(e) => userProfileChangeHandler(e)}
          />
          <Input
            type="text"
            placeholder="Date of Birth"
            name="dob"
            value={userProfile?.dob}
            readOnly={!isFormEdit}
            disabled={!isFormEdit}
            onChange={(e) => userProfileChangeHandler(e)}
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
            placeholder="Nationality"
            name="nationality"
            value={userProfile?.nationality}
            readOnly={!isFormEdit}
            disabled={!isFormEdit}
            onChange={(e) => userProfileChangeHandler(e)}
          />
          <Input
            type="text"
            name="gender"
            placeholder="Gender"
            value={userProfile?.gender}
            readOnly={!isFormEdit}
            disabled={!isFormEdit}
            onChange={(e) => userProfileChangeHandler(e)}
          />
        </div>
      </div>

      <div className="flex justify-center lg:justify-end w-full mt-5">
        {!isFormEdit ? (
          <Button text="edit" onClick={() => setIsFormEdit(true)} />
        ) : (
          <div className="flex items-center gap-4">
            <Button text="Cancel" onClick={() => setIsFormEdit(false)} />
            <Button
              text={isLoading ? "Saving..." : "Save"}
              disabled={isLoading}
              readOnly={isLoading}
              onClick={updateProfileSaveHandler}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;
