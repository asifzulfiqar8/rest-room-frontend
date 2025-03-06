import { useState } from "react";

import { IoIosArrowBack } from "react-icons/io";
import Aside from "./aside/Aside";
import Header from "./header/Header";
import Main from "./main/Main";

const InspectionHome = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const mobileNavHandler = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  const [isNavOpen, setIsNavOpen] = useState(true);

  return (
    // <section className="w-full user-dashboard relative overflow-x-hidden  bg-[#F5F2FF] z-0 scrollbar-0">
    //   <div className="flex flex-col-2">
    //     <div
    //       onClick={mobileNavHandler}
    //       className={`block md:hidden fixed h-full z-[999] transition-all duration-300  ${
    //         isMobileNavOpen ? "bg-[#000000b7] inset-0" : ""
    //       }`}
    //     >
    //       <div
    //         onClick={mobileNavHandler}
    //         className={`cursor-pointer absolute z-[999999] p-[0.12rem]  backdrop-blur-lg   ${
    //           isMobileNavOpen
    //             ? "rotate-0 rounded-r-md bg-gradient-to-b from-[#039099] to-[#C51FFF]"
    //             : "rotate-180 rounded-l-md bg-white"
    //         }`}
    //       >
    //         <IoIosArrowBack fontSize={18} color="#00000099" />
    //         {isMobileNavOpen && <Aside />}
    //       </div>
    //     </div>
    //     <div className="bg-linearGrad backdrop-blur-lg hidden md:block">
    //       <Aside />
    //     </div>
    //     <div className="w-[100%]">
    //       <Header isNavOpen={isNavOpen} />

    //       <Main />
    //     </div>
    //   </div>
    // </section>
    <div className="user-dashboard  w-full p-2 flex justify-between  h-screen overflow-hidden relative z-0">
      <Aside />
      <div className="flex-1 w-full">
        <Header />
        <Main />
      </div>
    </div>
  );
};

export default InspectionHome;
