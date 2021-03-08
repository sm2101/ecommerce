import React, { useEffect, useState } from "react";
import { Card } from "antd";
import { useSelector, useDispatch } from "react-redux";
import {
  getCart,
  emptyCart,
  saveAddress,
  applyCoupon,
} from "../Functions/user";
import { ADD_TO_CART, ADD_COUPON } from "../Actions/types";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
const { Meta } = Card;
const Checkout = ({ history }) => {
  const [products, setProducts] = useState([]),
    [total, setTotal] = useState(0),
    [address, setAddress] = useState(""),
    [couponApplied, setCouponApplied] = useState(""),
    [totalAfterDiscount, setTotalAfterDiscount] = useState(0),
    [addrSaved, setAddrSaved] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  useEffect(() => {
    getCart(user.token).then((res) => {
      setProducts(res.data.products);
      console.log(res.data.products);
      setTotal(res.data.cartTotal);
    });
  }, []);
  const saveAddressToDb = () => {
    //save user address to db
    saveAddress(address, user.token).then((res) => {
      if (res.data.ok) {
        setAddrSaved(true);
        toast.success("Address Saved");
      }
    });
  };
  const emptyCartFunc = () => {
    // from localStorage
    if (typeof window !== "undefined") {
      localStorage.removeItem("cart");
    }
    // from redux
    dispatch({
      type: ADD_TO_CART,
      payload: [],
    });
    // from db
    emptyCart(user.token).then((res) => {
      toast.success("Your Cart has been dumped.");
      history.push("/");
    });
  };
  const handleCoupon = () => {
    applyCoupon(couponApplied, user.token)
      .then((res) => {
        setTotalAfterDiscount(res.data.totalAfterDiscount);
        toast.success("Coupon Applied!!");
        dispatch({
          type: ADD_COUPON,
          payload: true,
        });
      })
      .catch((err) => {
        setTotalAfterDiscount(0);
        toast.error("Invalid/Expired Coupon");
        dispatch({
          type: ADD_COUPON,
          payload: false,
        });
      });
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <h4>Delivery Address</h4>
          <br />
          <br />
          <ReactQuill theme="snow" value={address} onChange={setAddress} />
          <button className="btn btn-primary mt-2" onClick={saveAddressToDb}>
            Save
          </button>
          <hr />
          <h4>Got A Coupon?</h4>
          <br />
          <input
            type="text"
            className="form-control"
            value={couponApplied}
            onChange={(e) => setCouponApplied(e.target.value)}
          />
          <button
            className="btn btn-outline-success  mt-2"
            onClick={handleCoupon}
          >
            Apply
          </button>
        </div>

        <div className="col-md-6">
          <Card
            actions={[
              <button
                onClick={() => history.push("/payment")}
                className="btn btn-success"
                disabled={!addrSaved}
              >
                Place Order
              </button>,
              <button
                className="btn btn-outline-danger"
                onClick={emptyCartFunc}
              >
                Empty Cart
              </button>,
            ]}
          >
            <Meta title="Order Summary" />
            <ul className="list-group-flush p-0">
              {products.map((c, i) => (
                <li className="list-group-item d-flex justify-content-between">
                  <span>{`${c.product.title} x ${c.count}`}</span>
                  <span>{`Rs. ${c.price * c.count}`}</span>
                </li>
              ))}
              <li className="list-group-item d-flex justify-content-between">
                <span>
                  <strong>Total</strong>
                </span>
                <span>{`Rs. ${total}`}</span>
              </li>
              {totalAfterDiscount > 0 && (
                <li className="list-group-item d-flex justify-content-between bg-success text-white">
                  <span>
                    <strong>Total After Discount</strong>
                  </span>
                  <span>{`Rs. ${totalAfterDiscount}`}</span>
                </li>
              )}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
