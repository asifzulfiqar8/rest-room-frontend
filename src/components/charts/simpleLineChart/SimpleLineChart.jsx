import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const data = [
  { name: "", uv: 4000, pv: 2400, amt: 2400 },
  { name: "5 May", uv: 3000, pv: 1398, amt: 2210 },
  { name: "6 May", uv: 2000, pv: 9800, amt: 2290 },
  { name: "7 May", uv: 2780, pv: 3908, amt: 2000 },
  { name: "8 May", uv: 1890, pv: 4800, amt: 2181 },
  { name: "9 May", uv: 2390, pv: 3800, amt: 2500 },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-300 p-2 rounded shadow-lg">
        <p className="text-xs md:text-sm lg:text-base text-gray-700">
          {`Value: ${payload[0].value}`}
        </p>
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

const SimpleLineChart = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        marginTop: "20px",
      }}
    >
      <div style={{ flex: 1 }}>
        <ResponsiveContainer width="100%" height="70%">
          <LineChart
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 30, // Increased bottom margin to accommodate the title
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={<CustomXAxisTick />} />
            <YAxis tick={<CustomYAxisTick />} />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="uv"
              stroke="#058F9A"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
        <div className="flex flex-col md:flex-row justify-between mt-3 items-center p-3">
          <div className="left">
            <p className="text-xs md:text-sm lg:text-base text-gray-600">
              Your performance is 50% better <br /> compared to last month
            </p>
          </div>
          <div className="right">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">
              50%
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleLineChart;
