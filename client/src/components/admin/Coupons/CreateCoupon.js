import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import AdminNav from "../../Nav/AdminNav";
import "react-datepicker/dist/react-datepicker.css";
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
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10">
          <h4 className="mt-4">{loading ? "Loading..." : "Coupons"}</h4>
          <form onSubmit={handleSubmit}>
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
          <table className="table table-bordered">
            <thead className="thead-light">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Exipry</th>
                <th scope="col">Discount %</th>
                <th scope="col">Remove</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((c) => (
                <tr key={c._id}>
                  <td>{c.name}</td>
                  <td>{new Date(c.expiry).toLocaleDateString()}</td>
                  <td>{`${c.discount} %`}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleRemove(c._id)}
                    >
                      <DeleteOutlined />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CreateCoupon;
