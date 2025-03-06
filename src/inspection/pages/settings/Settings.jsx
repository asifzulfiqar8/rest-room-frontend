import { useState } from "react";
import Profile from "./components/Profile";
import Aside from "./components/Aside";

const Settings = () => {
  const [activeButton, setActiveButton] = useState("profile");

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  return (
    <div className="parentContainer">
      <div className="piechart p-5">
        <div className="col-span-12 lg:col-span-10">
          <h3 className="text-lg md:text-xl font-semibold mb-4">My Profile</h3>
          <Profile />
        </div>
      </div>
    </div>
  );
};

export default Settings;
