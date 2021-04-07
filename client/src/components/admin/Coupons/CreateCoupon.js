import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import AdminNav from "../../Nav/AdminNav";
import "react-datepicker/dist/react-datepicker.css";
import { Card } from "antd";
import {
  getCoupons,
  removeCoupon,
  createCoupon,
} from "../../../Functions/coupon";
import { DeleteOutlined } from "@ant-design/icons";
const CreateCoupon = () => {
  const [name, setName] = useState(""),
    [expiry, setExpiry] = useState(""),
    [discount, setDiscount] = useState(""),
    [coupons, setCoupons] = useState([]),
    [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  const loadAllCoupons = () => {
    getCoupons()
      .then((res) => {
        setCoupons(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    createCoupon({ name, expiry, discount }, user.token)
      .then((res) => {
        toast.success("Coupon Created");
        setLoading(false);
        setName("");
        setDiscount("");
        setExpiry("");
        loadAllCoupons();
      })
      .catch((err) => {
        toast.error("Some error occured, Try Again");
        setLoading(false);
      });
  };
  const handleRemove = (couponId) => {
    setLoading(true);
    if (window.confirm("Delete?")) {
      removeCoupon(couponId, user.token)
        .then((res) => {
          toast.success("Coupon Deleted");
          loadAllCoupons();
        })
        .catch((err) => {
          toast.error("Some error occured!");
        });
    }
    setLoading(false);
  };
  useEffect(() => {
    loadAllCoupons();
  }, []);
  return (
    <div className="container-fluid">
      <div className="row d-flex justify-content-center">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10">
          <h4 className="mt-4">{loading ? "Loading..." : "Coupons"}</h4>
          <form onSubmit={handleSubmit} className="w-100">
            <div className="form-group">
              <div className="text-muted">Name</div>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
                required
              />
            </div>
            <div className="form-group">
              <div className="text-muted">Discount %</div>
              <input
                type="text"
                className="form-control"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <div className="text-muted">Exipry</div>
              <DatePicker
                className="form-control w-100"
                selected={new Date()}
                value={expiry}
                required
                onChange={(date) => setExpiry(date)}
              />
            </div>
            <button className="btn btn-primary btn-block mt-3">Save</button>
          </form>
          <hr />
          <div className="row">
            {coupons.map((c) => (
              <div className="col-12 col-md-3">
                <Card
                  title={c.name}
                  key={c._id}
                  actions={[
                    <button
                      className="btn btn-danger btn-block"
                      onClick={() => handleRemove(c._id)}
                    >
                      <DeleteOutlined />
                    </button>,
                  ]}
                >
                  <div className="row d-flex justify-content-between">
                    <div className="col-6">
                      {`Expiry - ${new Date(c.expiry).toLocaleDateString()}`}
                    </div>
                    <div className="col-6 text-end">{`Discount - ${c.discount} %`}</div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCoupon;
