/* eslint-disable react/prop-types */
const ThreeLinesCircularChart = ({ data }) => {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;

  const highData = data.find((entry) => entry.name === "High");
  const mediumData = data.find((entry) => entry.name === "Medium");
  const lowData = data.find((entry) => entry.name === "Low");

  const highPercentage = highData ? highData.value : 0;
  const mediumPercentage = mediumData ? mediumData.value : 0;
  const lowPercentage = lowData ? lowData.value : 0;

  const highOffset = circumference - (highPercentage / 100) * circumference;
  const mediumOffset = circumference - (mediumPercentage / 100) * circumference;
  const lowOffset = circumference - (lowPercentage / 100) * circumference;

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div className="relative w-[210px] h-[210px] ">
          <svg
            viewBox="0 0 120 120"
            className="transform rotate-[-90deg] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[210px] h-[210px]"
          >
            <circle
              className="text-[#e9ebf3]"
              strokeWidth="6"
              stroke="currentColor"
              fill="transparent"
              r="50"
              cx="60"
              cy="60"
            />
            <circle
              className="text-green-500"
              strokeWidth="6"
              strokeDasharray={circumference}
              strokeDashoffset={highOffset}
              strokeLinecap="round"
              stroke={highData.color}
              fill="transparent"
              r="50"
              cx="60"
              cy="60"
            />
          </svg>
          <svg
            viewBox="0 0 120 120"
            className="transform rotate-[-90deg] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[175px] h-[175px]"
          >
            <circle
              className="text-[#e9ebf3]"
              strokeWidth="7"
              stroke="currentColor"
              fill="transparent"
              r="50"
              cx="60"
              cy="60"
            />
            <circle
              className="text-green-800"
              strokeWidth="7"
              strokeDasharray={circumference}
              strokeDashoffset={mediumOffset}
              strokeLinecap="round"
              stroke={mediumData.color}
              fill="transparent"
              r="50"
              cx="60"
              cy="60"
            />
          </svg>
          <svg
            viewBox="0 0 120 120"
            className="transform rotate-[-90deg] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[140px] h-[140px]"
          >
            <circle
              className="text-[#e9ebf3]"
              strokeWidth="7"
              stroke="currentColor"
              fill="transparent"
              r="50"
              cx="60"
              cy="60"
            />
            <circle
              className="text-green-800"
              strokeWidth="7"
              strokeDasharray={circumference}
              strokeDashoffset={lowOffset}
              strokeLinecap="round"
              stroke={lowData.color}
              fill="transparent"
              r="50"
              cx="60"
              cy="60"
            />
          </svg>
          <div
            className="absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] text-center"
            style={{
              width: "90%",
              height: "90%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.5rem", // Adjust the font size as needed
              fontWeight: "bold",
              color: "#030229", // Adjust the text color as needed
            }}
          >
            <span>90%</span>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 mt-2">
          {data?.map((entry, i) => (
            <div className="flex items-center gap-1" key={i}>
              <div
                className="w-[15px] h-[15px] rounded-[5px]"
                style={{ background: entry.color }}
              ></div>
              <p className="text-sm text-[#030229]">
                {entry.name}{" "}
                <span className="text-base font-semibold">{entry.value}%</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ThreeLinesCircularChart;
