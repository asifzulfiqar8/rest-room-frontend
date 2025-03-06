// ==============INSPECTION NOTIFICATION

import React from "react";
// import ProfilePic from "../../../assets/images/header/profilepic.webp";
import { AiFillNotification } from "react-icons/ai";

const notificationLists = [
  {
    // userProfile: ProfilePic,
    title: "Exceeded Time Limit",
    message: "Sensor Fixed.",
    time: "2m",
  },
  {
    // userProfile: ProfilePic,
    title: "Exceeded Time Limit",
    message: "Sensor Disturbed.",
    time: "Just Now",
  },
];

const Notifications = () => {
  return (
    <div>
      <h3 className="text-base md:text-md text-primary font-semibold px-3 pt-3 pb-2 border-b sticky top-0 left-0 bg-white">
        Notifications
      </h3>
      <div className="mt-1">
        {notificationLists.length > 0 ? (
          notificationLists.map((notification, i) => (
            <div
              key={i}
              className="border-b py-1 px-2 flex items-center justify-between gap-1 cursor-pointer"
            >
              <div className="flex items-center gap-2 ">
                {/* <img
                  src={notification.userProfile}
                  alt="profile"
                  className="w-[25px] h-[25px] object-cover rounded-full"
                /> */}
                <AiFillNotification fontSize={23} className="text-[#A449EB]" />
                <div>
                  <h3 className="text-xs font-medium">{notification.title}</h3>
                  <p className="text-[12px] text-[#A449EB] text-left">
                    {notification.message}
                  </p>
                </div>
              </div>
              <p className="text-[#00000099] text-[10px]">
                {notification.time}
              </p>
            </div>
          ))
        ) : (
          <p className="p-3 text-sm text-center">No notifications yet!</p>
        )}
      </div>
    </div>
  );
};

export default Notifications;
