import React, { useEffect, useState } from "react";
import { Card } from "antd";
import { useSelector, useDispatch } from "react-redux";
import {
  getCart,
  emptyCart,
  saveAddress,
  applyCoupon,
  createPODOrder,
} from "../Functions/user";
import { ADD_TO_CART, ADD_COUPON, P_O_D } from "../Actions/types";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
const Checkout = ({ history }) => {
  const [products, setProducts] = useState([]),
    [total, setTotal] = useState(0),
    [address, setAddress] = useState(""),
    [couponApplied, setCouponApplied] = useState(""),
    [totalAfterDiscount, setTotalAfterDiscount] = useState(0),
    [addrSaved, setAddrSaved] = useState(false);

  const { user, POD, coupon } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  useEffect(() => {
    getCart(user.token).then((res) => {
      setProducts(res.data.products);
      console.log(res.data.products);
      setTotal(res.data.cartTotal);
    });
  }, [user.token]);
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
  const createCashOrder = () => {
    createPODOrder(user.token, coupon).then((res) => {
      if (res.data.ok) {
        if (typeof window !== "undefined") {
          localStorage.removeItem("cart");
        }
        // from redux
        dispatch({
          type: ADD_TO_CART,
          payload: [],
        });
        dispatch({
          type: ADD_COUPON,
          payload: false,
        });
        dispatch({
          type: P_O_D,
          payload: false,
        });
        // from db
        emptyCart(user.token).then((r) => {
          history.push("/user/history");
        });
      }
    });
  };
  return (
    <div className="container">
      <div className="row my-5">
        <div className="col-md-6 mb-5">
          <Card
            title="Add a Delivery Address"
            actions={[
              <span className="text-success" onClick={saveAddressToDb}>
                Save
              </span>,
            ]}
          >
            <ReactQuill theme="snow" value={address} onChange={setAddress} />
          </Card>
          <p className="text-center text-muted mt-3">
            *Please add an address to{" "}
            <span className="badge bg-success">Place Order</span>
          </p>
        </div>

        <div className="col-md-6">
          <Card
            title="Order Summary"
            actions={[
              <span>
                {POD ? (
                  <button
                    onClick={createCashOrder}
                    className="btn btn-success"
                    disabled={!addrSaved}
                  >
                    Place Order
                  </button>
                ) : (
                  <button
                    onClick={() => history.push("/payment")}
                    className="btn btn-success"
                    disabled={!addrSaved}
                  >
                    Place Order
                  </button>
                )}
              </span>,
              <button
                className="btn btn-outline-danger"
                onClick={emptyCartFunc}
              >
                Empty Cart
              </button>,
            ]}
          >
            <ul className="list-group-flush p-0">
              {products.map((c, i) => (
                <li className="list-group-item d-flex justify-content-between">
                  <span>{`${c.product.title} x ${c.count}`}</span>
                  <span>
                    <span>&#8377;</span>
                    {c.price * c.count}
                  </span>
                </li>
              ))}
              <li className="list-group-item d-flex justify-content-between">
                <span>
                  <strong>Total</strong>
                </span>
                <span>
                  <span>&#8377;</span> {` ${total}`}
                </span>
              </li>
              {totalAfterDiscount > 0 && (
                <li className="list-group-item d-flex justify-content-between bg-success text-white">
                  <span>
                    <strong>Total After Discount</strong>
                  </span>
                  <span>
                    <span>&#8377;</span> {`${totalAfterDiscount}`}
                  </span>
                </li>
              )}
            </ul>
            <div className="row">
              <div className="col-12 col-md-3 text-center">
                <strong>Got a Coupon?</strong>
              </div>
              <div className="col-12 col-md-8">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    value={couponApplied}
                    onChange={(e) => setCouponApplied(e.target.value)}
                  />
                  <button
                    className="btn btn-outline-success"
                    onClick={handleCoupon}
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
