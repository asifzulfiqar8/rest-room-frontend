import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  { name: "", floor1: 100, floor2: 2400, floor3: 2400 },
  { name: "5 May", floor1: 200, floor2: 1398, floor3: 4010 },
  { name: "6 May", floor1: 1800, floor2: 1800, floor3: 2290 },
  { name: "7 May", floor1: 680, floor2: 3908, floor3: 2500 },
  { name: "8 May", floor1: 1890, floor2: 4500, floor3: 2181 },
  { name: "9 May", floor1: 1890, floor2: 2400, floor3: 2181 },
  { name: "10 May", floor1: 1890, floor2: 4000, floor3: 2181 },
  { name: "11 May", floor1: 1890, floor2: 1400, floor3: 2981 },
  { name: "12 May", floor1: 1890, floor2: 5500, floor3: 1181 },
  { name: "13 May", floor1: 490, floor2: 3800, floor3: 500 },
  { name: "14 May", floor1: 1500, floor2: 2900, floor3: 2700 },
  { name: "15 May", floor1: 1200, floor2: 3100, floor3: 2300 },
  { name: "16 May", floor1: 2000, floor2: 2000, floor3: 4000 },
  { name: "17 May", floor1: 950, floor2: 1500, floor3: 1800 },
  { name: "18 May", floor1: 2100, floor2: 4500, floor3: 3500 },
  { name: "19 May", floor1: 1700, floor2: 3800, floor3: 2900 },
  { name: "20 May", floor1: 2500, floor2: 3100, floor3: 2200 },
];

const ActivityChart = () => {
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
        <ResponsiveContainer width="100%" height="88%">
          <LineChart
            data={data}
            margin={{
              top: 10,
              right: 20, // Increase left margin to ensure lines fit inside the chart
              bottom: 10, // Increased bottom margin for legend
            }}
          >
            <CartesianGrid />
            <XAxis dataKey="name" />
            <YAxis domain={["auto", "auto"]} /> {/* Auto-scaling Y-axis */}
            <Tooltip /> {/* Tooltip to show values on hover */}
            <Legend
              layout="horizontal"
              align="center"
              verticalAlign="start"
              wrapperStyle={{
                position: "relative",
                bottom: 10,
                marginTop: 5,
                marginBottom: 20, // Adjust spacing between the chart and legend
              }}
              formatter={(value, entry) => (
                <span style={{ color: entry.color }}>{value}</span>
              )}
            />
            <Line
              type="monotone"
              dataKey="floor1"
              stroke="#FF4C85"
              strokeWidth={3}
              dot={false}
            />{" "}
            {/* First line */}
            <Line
              type="monotone"
              dataKey="floor2"
              stroke="#FF7300"
              strokeWidth={3}
              dot={false}
            />{" "}
            {/* Second line */}
            <Line
              type="monotone"
              dataKey="floor3"
              stroke="#1F2253"
              strokeWidth={3}
              dot={false}
            />{" "}
            {/* Third line */}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ActivityChart;
