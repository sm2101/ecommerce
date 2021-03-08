import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripePayment from "./StripePayment";
const promise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

const Payment = () => {
  return (
    <div className="container">
      <div className="row mt-5 pt-5">
        <div className="col-12 d-flex justify-content-center">
          <h4>Complete Your Payment</h4>
        </div>
      </div>
      <div className="row">
        <div className="col-12 p-5">
          <Elements stripe={promise}>
            <StripePayment />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default Payment;
