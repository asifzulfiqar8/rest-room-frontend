/* eslint-disable react/prop-types */
import { planCards } from "../../../data/data";
import PriceCard from "./PriceCard";
import Button from "../button/Button";

const PricePlans = ({ onSelectPlan }) => {
  return (
    <div>
      <div className="flex flex-col xl:flex-row justify-between items-center">
        <div className="my-2 md:my-5 space-y-2">
          <h4 className="text-[18px] sm:text-[28px] font-[600] text-[#414141] leading-[27px]">
            Choose Your Right Plan
          </h4>
          <p className="text-[#414141] text-[14px]  sm:text-[16px] leading-[27px]">
            Upgrade to premium & Get more features{" "}
          </p>
        </div>
        <Button text="Trials End in" />
      </div>
      <div
        className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4"
        style={{ rowGap: "3rem" }}
      >
        {planCards.map((card, i) => (
          <PriceCard key={i} card={card} onSelectPlan={onSelectPlan} />
        ))}
      </div>
    </div>
  );
};

export default PricePlans;
