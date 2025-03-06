// ==============INSPECTION HEADER

import { useEffect, useRef, useState } from "react";
import { FaRegBell } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { IoIosArrowForward, IoIosLogOut } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import profilePic from "../../../assets/images/header/profilePic.png";
import Notifications from "./Notifications";
import authApi, { useLogoutMutation } from "../../../services/auth/authApi";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { userNotExist } from "../../../services/auth/authSlice";

const Header = () => {
  const [profileActive, setProfileActive] = useState(false);
  const navigate = useNavigate();
  const [notificationActive, setNotificationActive] = useState(false);
  const notificationRef = useRef();
  const profileRef = useRef();
  const [logout, { isLoading }] = useLogoutMutation();
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const toggleDropDown = () => {
    setProfileActive(!profileActive);
    setNotificationActive(false);
  };

  const handleNotification = () => {
    setNotificationActive(!notificationActive);
    setProfileActive(false);
  };

  const logoutHandler = async () => {
    try {
      const res = await logout().unwrap();
      if (res?.success) {
        dispatch(userNotExist());
        dispatch(authApi.util.resetApiState()); // here reseting the cache of user..
        toast.success(res?.message);
        return navigate("/login");
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <section
      id="header_banner"
      className="px-[25px] pt-[25px]  relative h-[15vh]"
    >
      <div className="flex justify-end  items-center gap-4">
        <button
          className="bg-black h-[40px] w-[40px] flex justify-center items-center rounded-lg relative"
          onClick={handleNotification}
          ref={notificationRef}
        >
          <FaRegBell color="white" />
          <GoDotFill
            color="#EB5757"
            className="absolute right-[-4px] top-[-6px]"
          />
          {notificationActive && (
            <div className="absolute top-[45px] right-[-60px] sm:right-0 bg-white drop-shadow-md rounded-lg w-[280px] h-[300px] border z-[999999] overflow-y-auto no-scrollbar">
              <Notifications />
            </div>
          )}
        </button>
        <div className="flex items-center gap-2 md:gap-4">
          <img
            src={user?.image?.url || profilePic}
            alt="profile-pic"
            className="w-[40px] h-[40px] rounded-lg object-cover hidden md:inline-block cursor-pointer"
            onClick={toggleDropDown}
          />
          <div className="flex flex-col items-center">
            {/* <p className="flex items-center gap-2 text-base text-[white] text-[16px] leading-[20.36px] font-[500]">
            {user?.user?.fullName || 'User'}
            <FaChevronDown
              size={10}
              onClick={toggleDropDown}
              rotate={profileActive ? 180 : 90}
              style={{ cursor: "pointer" }}
            />
          </p> */}
          </div>
        </div>
      </div>
      {profileActive && (
        <div
          className="absolute top-[70px] right-3 bg-white shadow-md rounded-lg w-[150px] z-10 border"
          ref={profileRef}
        >
          <Link
            className="flex items-center justify-between px-3 py-2 border-b"
            to={"/inspection/profile"}
            onClick={() => setProfileActive(false)}
          >
            Profile
            <IoIosArrowForward />
          </Link>
          <div
            className={`flex items-center justify-between px-3 cursor-pointer py-2 ${
              isLoading ? "opacity-50 pointer-events-none cursor-none" : ""
            }`}
            onClick={logoutHandler}
          >
            Logout
            <IoIosLogOut />
          </div>
        </div>
      )}
    </section>
  );
};

export default Header;
