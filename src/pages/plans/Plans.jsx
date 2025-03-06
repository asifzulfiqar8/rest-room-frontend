import { useState } from "react";
import PricePlans from "../../components/shared/plans/PricePlans";
import Review from "../../components/shared/plans/Review";

const Plans = () => {
  const [isTabActive, setIsActiveTab] = useState("price");
  const [selectedPlan, setSelectedPlan] = useState(null);

  const tabsHandler = (tab) => {
    setIsActiveTab(tab);
  };
  return (
    <div className="parentContainer">
      <div className="bg-white rounded-[15px] p-4 lg:p-6">
        {/* <div>
        <Title title="Subscription Plan" />
      </div> */}
        <div className="mt-4 md:mt-5">
          <div className="flex item-center gap-7">
            <button
              onClick={() => tabsHandler("price")}
              type="button"
              // text="Price Plans"
              className={`rounded-md ${
                isTabActive === "price"
                  ? "bg-[#A449EB] p-3  text-white font-bold"
                  : "bg-[#c1c1c126] font-bold p-3 text-[#00000099]"
              }`}
              color={isTabActive === "price" ? "text-[#fff]" : "#00000070"}
            >
              Price Plans
            </button>

            <button
              cursor={selectedPlan ? "cursor-pointer" : "cursor-not-allowed"}
              disabled={!selectedPlan}
              onClick={() => tabsHandler("review")}
              type="button"
              // text="Price Plans"
              className={`rounded-md ${
                isTabActive === "review"
                  ? "bg-[#A449EB] p-3  text-white font-bold"
                  : "bg-[#c1c1c126] font-bold p-3 text-[#00000099]"
              }`}
              color={isTabActive === "review" ? "#fff" : "#00000090"}
            >
              Review
            </button>
          </div>
          <div className="mt-4 md:mt-6 pb-7">
            {isTabActive === "price" && (
              <PricePlans
                onSelectPlan={(plan) => {
                  setSelectedPlan(plan);
                  tabsHandler("review");
                }}
              />
            )}
            {isTabActive === "review" && <Review plan={selectedPlan} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Plans;
