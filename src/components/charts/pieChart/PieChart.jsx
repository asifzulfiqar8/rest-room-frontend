import { PieChart, Pie, Cell, Legend } from "recharts";
import BuildingIcon from "../../../assets/dashboard/icon1.svg"; // Replace with the path to your SVG file

const data = [
  { name: "Group A", value: 5000 },
  { name: "Group B", value: 3000 },
  { name: "Group C", value: 2500 },
];

const COLORS = ["#FF955A", "#7A5AF8", "#34C1FD"];

const PieChartComponent = () => {
  return (
    <div style={{ position: "relative", width: "300px", height: "300px" }}>
      <PieChart width={300} height={300}>
        <Pie
          data={data}
          innerRadius={60}
          outerRadius={100}
          fill="#8884d8"
          paddingAngle={2}
          dataKey="value"
          labelLine={false}
          label={renderCustomizedLabel}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend
          layout="horizontal"
          align="center"
          verticalAlign="bottom"
          wrapperStyle={{
            paddingTop: 20, // Adjust spacing between the chart and legend
          }}
          formatter={(value, entry) => (
            <span style={{ color: entry.color }}>{value}</span>
          )}
        />
      </PieChart>
      <div
        style={{
          position: "absolute",
          top: "43%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "40px", // Adjust size as needed
          height: "40px", // Adjust size as needed
        }}
      >
        <img
          src={BuildingIcon}
          alt="Building Icon"
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    </div>
  );
};

// Custom label component (as before)
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  value,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) / 2;
  const x = cx + radius * Math.cos((-midAngle * Math.PI) / 180);
  const y = cy + radius * Math.sin((-midAngle * Math.PI) / 180);

  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      fill="#fff"
      fontSize="14px"
      fontWeight="bold"
      dominantBaseline="central"
    >
      {value}
    </text>
  );
};

export default PieChartComponent;
