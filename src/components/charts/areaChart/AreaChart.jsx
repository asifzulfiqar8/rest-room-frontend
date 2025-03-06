import React from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Area,
  ResponsiveContainer,
} from "recharts";
import { data } from "../chartdata.js";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-300 p-2 rounded shadow-lg">
        <p className="text-sm text-gray-700">{`${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

const CustomXAxisTick = ({ x, y, payload }) => {
  return (
    <text
      x={x}
      y={y + 15}
      textAnchor="middle"
      className="text-[10px] md:text-sm lg:text-base fill-current text-gray-700"
    >
      {payload.value}
    </text>
  );
};

const CustomYAxisTick = ({ x, y, payload }) => {
  return (
    <text
      x={x - 10}
      y={y + 4}
      textAnchor="end"
      className="text-[10px] md:text-sm lg:text-base fill-current text-gray-700"
    >
      {payload.value}
    </text>
  );
};

const AreaCharts = ({
  width,
  height,
  title,
  showXAxis,
  showYAxis,
  showGrid,
  show = false,
}) => {
  return (
    <div className="flex flex-col h-full">
      {title !== "" && (
        <h2 className="text-lg md:text-xl lg:text-2xl font-semibold mb-3">
          {title}
        </h2>
      )}
      <div className="flex-1">
        <ResponsiveContainer width={width} height={height}>
          <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#9787FF" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#D3CCFF" stopOpacity={0.8} />
              </linearGradient>
            </defs>
            {showGrid && <CartesianGrid strokeDasharray="3 3" />}
            {showXAxis && <XAxis dataKey="name" tick={<CustomXAxisTick />} />}
            {showYAxis && <YAxis tick={<CustomYAxisTick />} />}
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="pv"
              stroke="#9787FF"
              fill="url(#colorPv)"
            />
          </AreaChart>
        </ResponsiveContainer>
        {show && (
          <div className="flex justify-between mt-3 items-center p-3">
            <div className="left">
              <p className="text-[#767676]">
                Your performance is 30% better <br /> compared to last month
              </p>
            </div>

            <div className="right">
              <h2 className="text-2xl font-bold">30%</h2>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AreaCharts;
