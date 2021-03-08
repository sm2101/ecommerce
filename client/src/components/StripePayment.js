import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useSelector, useDispatch } from "react-redux";
import { createPaymentIntent } from "../Functions/stripe";
import { Card } from "antd";
import { DollarCircleOutlined, CheckCircleOutlined } from "@ant-design/icons";
const cardStyle = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: "Arial, sans-serif",
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#32325d",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};
const StripePayment = ({ history }) => {
  const [success, setSuccess] = useState(false),
    [error, setErroe] = useState(null),
    [processing, setProccesing] = useState(""),
    [disabled, setDisabled] = useState(true),
    [clientSecret, setClientSecret] = useState(""),
    [cartTotal, setCartTotal] = useState(0),
    [totalPayable, setTotalPayable] = useState(0);

  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const { user, coupon } = useSelector((state) => ({ ...state }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProccesing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: e.target.name.value,
        },
      },
    });
    if (payload.error) {
      setErroe(`Payment Failed ${payload.error.message}`);
      setProccesing(false);
    } else {
      console.log(payload);
      setErroe(null);
      setProccesing(false);
      setSuccess(true);
    }
  };
  const handleChange = (e) => {
    setDisabled(e.empty);
    setErroe(e.error ? e.error.message : "");
  };

  useEffect(() => {
    createPaymentIntent(user.token, coupon)
      .then((res) => {
        setClientSecret(res.data.clientSecret);
        setCartTotal(res.data.cartTotal);
        setTotalPayable(res.data.finalAmount);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      {!success && (
        <div className="text-center">
          {coupon ? (
            <p className="alert alert-success">{`Total after discount: ${totalPayable}`}</p>
          ) : (
            <p className="alert alert-danger">No Coupon Applied!</p>
          )}
        </div>
      )}
      <p className={success ? "result-message" : "result-message hidden"}>
        Payment Successful
      </p>
      <div className="text-center pb-5">
        <Card
          actions={[
            <>
              <DollarCircleOutlined className="text-info" />
              {`Total ${cartTotal}`}
            </>,
            <>
              <CheckCircleOutlined className="text-success" />
              {`Payable ${totalPayable}`}
            </>,
          ]}
        />
      </div>
      <form id="payment-form" className="stripe-form" onSubmit={handleSubmit}>
        <CardElement
          id="card-element"
          options={cardStyle}
          onChange={handleChange}
        />
        <button
          className="stripe-button"
          disabled={processing || disabled || success}
        >
          <span id="button-text">
            {processing ? <div className="spinner" id="spinner"></div> : "Pay"}
          </span>
        </button>
        <br />
        {error && (
          <div className="card-error" role="alert">
            {error}
          </div>
        )}
      </form>
    </>
  );
};

export default StripePayment;
