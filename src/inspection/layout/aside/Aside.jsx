import React, { useEffect, useState } from "react";
import logo from "../../../assets/images/auth/logo.svg";
// import { ChevronIcon, Hambarger } from "../../../assets/svgs";
import { pages } from "./pages";
import { Link, useLocation } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaChevronDown } from "react-icons/fa";

const Aside = () => {
  const [aside, setAside] = useState(false);
  const [subpagesIsActive, setSubpagesIsActive] = useState("");
  const location = useLocation();
  const url = location?.pathname;

  const asideToggleHandler = () => {
    setAside(!aside);
  };

  console.log("url", location);

  useEffect(() => {
    pages.forEach((page) => {
      if (page.subPages) {
        page.subPages.forEach((subPage) => {
          if (subPage.link === url) {
            setSubpagesIsActive(page.title);
          }
        });
      }
    });
  }, [url]);

  const handleSubpages = (subpage) =>
    setSubpagesIsActive((prev) => (prev === subpage ? null : subpage));

  return (
    <div
      className={`${
        aside
          ? "relative"
          : " fixed 2xl:relative rounded-lg bg-gradient-to-b from-secondary to-primary 2xl:w-auto h-screen 2xl:h-auto z-[999] p-1 2xl:p-0"
      }`}
      onClick={asideToggleHandler}
    >
      <aside
        className={`bbg-gradient-to-b from-secondary to-primary rounded-xl transition-all duration-300 h-full ${
          aside
            ? "w-0 invisible opacity-0"
            : "w-[230px] visible opacity-100 p-4"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 mb-7">
          <img src={logo} alt="logo" />
          <div
            className={`cursor-pointer relative z-[999] ${
              aside ? "pt-4 invisible" : "pt-0 visible"
            }`}
            onClick={asideToggleHandler}
          >
            <GiHamburgerMenu color="white" />
          </div>
        </div>
        {/* <div className="my-5 w-full h-[2px] bg-[#FFFFFF33]"></div> */}
        <div className="flex flex-col">
          {pages.map((page, i) => {
            return (
              <>
                {page.link ? (
                  <LinkItem key={i} page={page} url={url} />
                ) : (
                  <DropdownLink
                    key={i}
                    page={page}
                    handleSubpages={handleSubpages}
                    subpagesIsActive={subpagesIsActive}
                  />
                )}
                {page.subPages && (
                  <div
                    className={`${
                      subpagesIsActive === page.title
                        ? "max-h-[280px] opacity-100 my-3"
                        : "max-h-0 opacity-0 my-0"
                    } transition-all duration-500 overflow-hidden flex flex-col gap-3`}
                  >
                    {page.subPages.map((subPage, index) => (
                      <SubpagesLinkItem
                        key={index}
                        subPage={subPage}
                        url={url}
                      />
                    ))}
                  </div>
                )}
              </>
            );
          })}
        </div>
      </aside>
      <div
        onClick={asideToggleHandler}
        className={`cursor-pointer fixed top-[4%] left-[1.6%] z-[1] flex items-center justify-between w-[200px]`}
      >
        <div
          className={`cursor-pointer transition-all duration-300 ${
            aside ? "opacity-100" : "opacity-0"
          }`}
        >
          <GiHamburgerMenu color="purple" />
        </div>
      </div>
    </div>
  );
};

export default Aside;

const LinkItem = ({ page, url }) => {
  return (
    <Link
      to={page.link}
      className={`rounded-md py-2 px-4 flex items-center gap-4 mb-4 ${
        page.link === url ? "bg-[#FFFFFF4D]" : "bg-[#FFFFFF14]"
      }`}
    >
      <span>{page.icon}</span>
      <div className="text-[12px] md:text-sm text-white tracking-wide">
        {page.title}
      </div>
    </Link>
  );
};

const DropdownLink = ({ page, handleSubpages, subpagesIsActive }) => {
  return (
    <div
      className={`bg-[#FFFFFF14] transition-all duration-300 rounded-md py-2 px-4 flex items-center justify-between gap-4 cursor-pointer ${
        subpagesIsActive === page.title ? "mb-0" : "mb-4"
      }`}
      onClick={() => handleSubpages(page.title)}
    >
      <div className="flex items-center gap-2">
        <span>{page.icon}</span>
        <div className="text-[12px] md:text-sm text-white tracking-wide">
          {page.title}
        </div>
      </div>
      <div
        className={`transition-all duration-300 ${
          subpagesIsActive === page.title ? "rotate-180" : "rotate-0"
        }`}
      >
        <FaChevronDown fontSize={13} color="white" />
      </div>
    </div>
  );
};

const SubpagesLinkItem = ({ subPage, url }) => {
  return (
    <Link
      to={subPage.link}
      className={`flex items-center gap-3 ml-2 px-4 py-2 rounded-[10px] ${
        subPage.link === url ? "bg-[#FFFFFF4D]" : "bg-[#FFFFFF14]"
      }`}
    >
      <div className="w-[5px] h-[5px] rounded-full block bg-white"></div>
      <div className="text-white text-xs sm:text-sm">{subPage.title}</div>
    </Link>
  );
};
