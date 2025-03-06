import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <main
      className="px-4 h-[calc(100vh-170px)] overflow-y-scroll custom-scroll bg-[#F5F2FF]
 "
    >
      <Outlet />
    </main>
  );
};

export default Main;
