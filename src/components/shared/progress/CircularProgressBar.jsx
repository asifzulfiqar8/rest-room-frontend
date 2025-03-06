import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const getColorByPercentage = (percentage) => {
  let color;
  if (percentage > 31 && percentage <= 60) {
    color = "#32ADE6";
  } else if (percentage > 1 && percentage <= 30) {
    color = "#FF9500";
  } else {
    color = "#FF3B30";
  }
  return color;
};

const CircularProgressBar = ({ percentage, width, height, percentageSize }) => {
  const [color, setColor] = useState("");
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  // let color = getColorByPercentage(percentage)

  useEffect(() => {
    if (percentage) {
      let color = getColorByPercentage(percentage);
      setColor(color);
    }
  }, [percentage]);

  return (
    <div
      className={`relative flex items-center justify-center ${
        width ? width : "w-[95px]"
      } ${height ? height : "h-[95px]"}`}
    >
      <svg
        className="transform rotate-[-90deg]"
        width="100%"
        height="100%"
        viewBox="0 0 120 120"
      >
        <circle
          className="text-gray-300"
          strokeWidth="10"
          stroke="currentColor"
          fill="transparent"
          r="50"
          cx="60"
          cy="60"
        />
        <circle
          className="text-green-500"
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke={color}
          fill="transparent"
          r="50"
          cx="60"
          cy="60"
        />
      </svg>
      <span
        style={{ color: color }}
        className={`absolute ${
          percentageSize ? percentageSize : "text-[18px]"
        } font-semibold `}
      >{`${percentage}%`}</span>
    </div>
  );
};

CircularProgressBar.propTypes = {
  percentage: PropTypes.number.isRequired,
  color: PropTypes.string,
};

CircularProgressBar.defaultProps = {
  color: "#22c55e", // Default green color
};

export default CircularProgressBar;
