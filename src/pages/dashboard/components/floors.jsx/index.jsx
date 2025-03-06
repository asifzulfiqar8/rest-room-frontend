import OverallPerformance from "./OverallPerformance";
import FlowCount from "./FlowCount";
import StallUsage from "./StallUsage";
import ToiletStatus from "./ToiletStatus";

const Floor = () => {
  return (
    <div className="parentContainer">
      <div className="grid grid-cols-1">
        <ToiletStatus />
      </div>
      <div className="grid lg:grid-cols-1 xl:grid-cols-3 gap-4 mt-4">
        <div>
          <OverallPerformance />
        </div>
        <div>
          <FlowCount />
        </div>
        <div>
          <StallUsage />
        </div>
      </div>
    </div>
  );
};

export default Floor;
