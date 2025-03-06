import React from "react";
import {
  ComposedChart,
  Bar,
  Line,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
  Tooltip,
} from "recharts";

import Smile from "../../../assets/dashboard/Smile.svg";

const data = [
  { uv: 1390, pv: 800, amt: 1400 },
  { uv: 1768, pv: 967, amt: 1506 },
  { uv: 1097, pv: 1098, amt: 989 },
  { uv: 1480, pv: 1200, amt: 1228 },
  { uv: 1120, pv: 1108, amt: 1100 },
  { uv: 1400, pv: 680, amt: 1700 },
  { uv: 1200, pv: 680, amt: 1700 },
  { uv: 1100, pv: 680, amt: 1700 },
  { uv: 1800, pv: 680, amt: 1700 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip bg-white border border-gray-300 p-2 rounded flex justify-center items-center gap-2">
        <img src={Smile} alt="Tooltip Image" className="w-4 h-4" />
        <p className="label">{`${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

// Custom Tick Component
const CustomYAxisTick = ({ x, y, payload }) => {
  return (
    <text
      x={x - 10} // Adjust the x-position as needed
      y={y + 4} // Adjust the y-position as needed
      textAnchor="end"
      className="text-[10px] md:text-sm lg:text-base fill-current text-gray-700"
    >
      {payload.value}
    </text>
  );
};

const LineChart = ({ show = true }) => {
  const maxValue = Math.max(...data.map((entry) => entry.uv));

  return (
    <div className="flex flex-col h-full mt-5">
      <div className="flex-1">
        <ResponsiveContainer width="100%" height="70%">
          <ComposedChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 2,
              // right: 10,
              left: 0,
              bottom: 25,
            }}
          >
            <CartesianGrid stroke="#f5f5f5" />
            <YAxis
              domain={[0, 2000]}
              ticks={[0, 400, 800, 1200, 1600, 2000]}
              tick={<CustomYAxisTick />}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="uv" barSize={30}>
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.uv === maxValue ? "#A449EB" : "#E9ECF1"}
                />
              ))}
            </Bar>
            <Line type="linear" dataKey="uv" stroke="#A449EB" strokeWidth={3} />
          </ComposedChart>
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

export default LineChart;
