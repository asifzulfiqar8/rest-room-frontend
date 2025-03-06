/* eslint-disable react/prop-types */
import { FaMapMarkerAlt } from "react-icons/fa";
import { GrCheckboxSelected } from "react-icons/gr";
import Button from "../button/Button";
import { loadStripe } from "@stripe/stripe-js";

const Review = ({ plan }) => {
  const totalAmount = parseFloat(plan.price.replace("$", ""));
  const taxAmount = totalAmount * (30 / 100);
  const flooredTax = Math.floor(taxAmount * 100) / 100;
  const tax = flooredTax.toFixed(2);
  const price = totalAmount + flooredTax;
  const totalPrice = price.toFixed(2);

  const stripePromise = loadStripe(
    "pk_test_51PvZ4iP7RHPHbi3M9KECn35fLuLIc2dgUCJaxS8MvTnBmlSnBhJPJ119LRCh4KzBe6l764GjmScizm5itxW6aTND00mu2NTCE0"
  );
  const makePaymentStripe = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/api/create-checkout-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // body: JSON.stringify({product: plan}),
          body: JSON.stringify({
            product: {
              title: plan.title,
              price: Number(totalPrice),
            },
          }),
        }
      );

      const data = await response.json();

      console.log("Response", data);

      if (data.sessionId) {
        const stripe = await stripePromise;

        // Redirect to Stripe checkout
        const result = await stripe.redirectToCheckout({
          sessionId: data.sessionId,
        });

        if (result.error) {
          console.error(result.error.message);
        }
      } else {
        console.error("Failed to retrieve session ID");
      }
    } catch (error) {
      console.error("Error creating checkout session", error);
    }
  };

  return (
    <div>
      {/* <h4 className="text-sm md:text-base font-semibold">Review</h4> */}
      <div className="mt-4 md:mt-5 bg-[#7bc0f726] p-4 md:p-6 grid grid-cols-1 lg:grid-cols-3 gap-4 rounded-lg">
        <div>
          <div className="flex items-center gap-2 text-[#A449EB]">
            <FaMapMarkerAlt fontSize={22} />
            <p className="text-sm md:text-base font-[600]">Billing Address</p>
          </div>
          <p className="text-sm md:text-md font-semibold my-2 md:my-4">
            5678 Maple Avenue, Anytown, CA, 90210, USA
          </p>
          <PriceList title="Plan Selected:" value={plan.title} />
          <PriceList title="Monthly Fee:" value={plan.price} />
          <PriceList title="Tax:" value={`$${tax}`} />
          <div className="w-full h-[1px] bg-[#00000066] mb-3"></div>
          <PriceList title="Total Monthly Charge:" value={`$${totalPrice}`} />
        </div>
        <div></div>
        <div
          className="px-4 py-4 md:py-6 rounded-[10px]"
          style={{ background: plan.bg }}
        >
          <h6 className="text-base md:text-xl text-black text-center">
            {plan.title}
          </h6>
          <p className="text-base md:text-xl text-black text-center font-semibold mt-1">
            {plan.price}
            <span className="font-normal text-sm md:text-lg">/Month</span>
          </p>
          <div className="mt-6">
            <p className="text-black text-[11px] md:text-xs">Features</p>
            <div className="mt-4">
              {plan.featuresList.map((list, i) => (
                <div key={i} className="flex items-center gap-2 mb-2">
                  <GrCheckboxSelected />
                  <p className="text-black text-xs md:text-sm">{list}</p>
                </div>
              ))}
              <div className="mt-6">
                <p className="text-black text-[11px] md:text-xs">Description</p>
                <p className="text-black text-xs md:text-sm mt-3">
                  {plan.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-5">
        <Button
          text="Confirm & Subscribe"
          width="w-[160px] md:w-[268px]"
          onClick={makePaymentStripe}
        />
      </div>
    </div>
  );
};

export default Review;

const PriceList = ({ title, value }) => {
  return (
    <div className="flex items-center justify-between gap-4 mb-3">
      <p className="text-sm md:text-base">{title}</p>
      <p className="text-sm md:text-base font-medium md:font-semibold">
        {value}
      </p>
    </div>
  );
};
