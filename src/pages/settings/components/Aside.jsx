import { NavLink } from "react-router-dom";

const Aside = () => {
  return (
    <div
      className="grid grid-col-1 gap-5 sticky top-10 left-0 "
      style={{ marginRight: "10px" }}
    >
      <NavLink
        to="/home/setting"
        className={({ isActive }) =>
          `w-full px-6 py-3 flex items-center justify-center rounded-lg text-center ${
            isActive ? "bg-[#A449EB] text-white" : "bg-gray-200"
          }`
        }
      >
        Profile
      </NavLink>
      <NavLink
        to="/home/subscription"
        className={({ isActive }) =>
          `w-full  px-6 py-3 flex items-center justify-center rounded-lg text-center ${
            isActive ? "bg-[#A449EB] text-white" : "bg-gray-200"
          }`
        }
      >
        Subscription Plan
      </NavLink>
      <NavLink
        to="/home/change-password"
        className={({ isActive }) =>
          `w-full  px-6 py-3  flex items-center justify-center rounded-lg text-center ${
            isActive ? "bg-[#A449EB] text-white" : "bg-gray-200"
          }`
        }
      >
        Change Password
      </NavLink>
    </div>
  );
};

export default Aside;
