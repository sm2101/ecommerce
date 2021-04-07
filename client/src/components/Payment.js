import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripePayment from "./StripePayment";
import { Card } from "antd";
const promise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

const Payment = () => {
  return (
    <div className="container-fluid">
      <div className="row mt-5 pt-5">
        <div className="col-12 d-flex justify-content-center">
          <h4>Complete Your Payment</h4>
        </div>
      </div>
      <div className="row d-flex justify-content-center align-items-center m-0">
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ fontSize: "large" }}
        >
          <Card
            title="Card Number: 4242 4242 4242 4242"
            style={{ width: "30rem" }}
          >
            <div className=" w-100 d-flex justify-content-around">
              <span>Expiry: 04/24</span>
              <span>CVC: 242</span>
              <span>ZIP Code: 42424</span>
            </div>
          </Card>
        </div>
      </div>
      <div className="row d-flex justify-content-center align-items-center">
        <div className="col-12 col-md-8 d-flex justify-content-center align-items-center mb-5 ">
          <Elements stripe={promise}>
            <StripePayment />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default Payment;
