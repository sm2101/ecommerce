import React, { useState, useEffect } from "react";
import AdminNav from "../Nav/AdminNav";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { CheckCircleFilled, CloseCircleFilled } from "@ant-design/icons";
import { getOrders, updateOrder } from "../../Functions/admin";
export default function Dashboard() {
  const [orders, setOrders] = useState([]);

  const { user } = useSelector((state) => ({ ...state }));

  const loadOrders = () => {
    getOrders(user.token).then((res) => {
      setOrders(res.data);
    });
  };
  useEffect(() => {
    loadOrders();
  }, []);

  const handleStatusChange = (orderId, ordderStatua) => {
    updateOrder(orderId, ordderStatua, user.token).then((res) => {
      toast.success("Order Status Updated");
      loadOrders();
    });
  };
  return (
    <>
      <div className="container-fluid">
        <div className="row d-flex justify-content-center">
          <div className="col-md-2">
            <AdminNav />
          </div>
          <div
            className="col-12 col-md-10 text-center overflow-scroll"
            style={{ height: "80vh" }}
          >
            <h1>All Orders</h1>
            <div className="row h-100">
              <div className="col-12" style={{ fontSize: "x-small" }}>
                {orders.map((order, i) => (
                  <div key={i} className="m-5 p-3 card ">
                    <div className="row w-100">
                      <div className="col-12 text-center">
                        <p>Order Id: {order.paymentIntent.id}</p>
                        <p>
                          {`Order Amount : ${(
                            order.paymentIntent.amount / 100
                          ).toLocaleString("en-US", {
                            style: "currency",
                            currency: "INR",
                          })}`}
                          {" / "}
                          {`Method: ${order.paymentIntent.payment_method_types[0]}}`}
                          {" / "}
                          {`Payment Status: ${order.paymentIntent.status.toUpperCase()}}`}
                          {" / "}
                          {`Ordered On: ${new Date(
                            order.paymentIntent.created * 1000
                          ).toLocaleString("en-US", {
                            style: "date",
                            hour12: true,
                            month: "long",
                            day: "2-digit",
                            year: "numeric",
                            weekday: "short",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}`}
                        </p>
                      </div>
                    </div>
                    <div className="row w-100 overflow-scroll">
                      <table className="table">
                        <thead className="thead-dark">
                          <tr>
                            <th scope="col">Title</th>
                            <th scope="col">Price</th>
                            <th scope="col">Count</th>
                            <th scope="col">Color</th>
                            <th scope="col">Shipping</th>
                          </tr>
                        </thead>
                        <tbody>
                          {order.products.map((p, i) => (
                            <tr key={i}>
                              <td>{p.product.title}</td>
                              <td>{p.product.price}</td>
                              <td>{p.count}</td>
                              <td>{p.product.color}</td>
                              <td>
                                {p.product.shipping === "Yes" ? (
                                  <CheckCircleFilled className="text-success" />
                                ) : (
                                  <CloseCircleFilled className="text-danger" />
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="row d-flex justify-content-center">
                      <div className="col-12 col-md-6 text-center">
                        <label htmlFor="status">Order Status</label>
                        <select
                          id="status"
                          className="form-control"
                          defaultValue={order.ordderStatus}
                          onChange={(e) =>
                            handleStatusChange(order._id, e.target.value)
                          }
                        >
                          <option value="Not Proccessed">Not Proccessed</option>
                          <option value="Proccessing">Proccessing</option>
                          <option value="Dispatched">Dispatched</option>
                          <option value="Cancelled">Cancelled</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
