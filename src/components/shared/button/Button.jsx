import React, { useState } from "react";

const Button = ({
  text,
  textColor = "#fff",
  bg,
  hoverBg,
  hoverTextColor,
  firstIcon = false,
  lastIcon = false,
  borderColor,
  width,
  ...rest
}) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <button
      className={`rounded-md px-[21px] py-[10px] flex gap-1 items-center justify-center capitalize font-bold ${
        width ? width : "w-fit"
      } ${
        bg
          ? bg
          : "bg-[#A449EB] text-white hover:bg-transparent hover:text-[#A449EB] hover:border-[#A449EB] border-[1px]"
      }`}
      style={{
        transition: "background-color 0.3s ease, color 0.3s ease",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...rest}
    >
      {firstIcon && <span>{firstIcon}</span>}
      {text}
      {lastIcon && <span>{lastIcon}</span>}
    </button>
  );
};

export default Button;
