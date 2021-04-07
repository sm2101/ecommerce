import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Card } from "antd";
import CartProduct from "../components/cards/CartProduct";
import { userCart } from "../Functions/user";
import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { P_O_D } from "../Actions/types";
const Cart = ({ history }) => {
  const { user, cart } = useSelector((state) => ({ ...state }));
  const getTotal = () => {
    return cart.reduce((prev, next) => {
      return prev + next.count * next.price;
    }, 0);
  };
  const dispatch = useDispatch();
  const showCart = () => (
    <table className="table table-bordered">
      <thead className="thead-light">
        <tr>
          <th scope="col">Image(s)</th>
          <th scope="col">Title</th>
          <th scope="col">Price</th>
          <th scope="col">Quantity</th>
          <th scope="col">Color</th>
          <th scope="col">Shipping</th>
          <th scope="col">Remove</th>
        </tr>
      </thead>
      <tbody>
        {cart.map((p) => (
          <CartProduct p={p} />
        ))}
      </tbody>
    </table>
  );
  const saveToDB = () => {
    dispatch({
      type: P_O_D,
      payload: false,
    });
    userCart(cart, user.token)
      .then((res) => {
        console.log("cart Saved");
        if (res.data.ok) {
          history.push("/checkout");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong, Try Again.");
      });
  };
  const saveToDBPOD = () => {
    dispatch({
      type: P_O_D,
      payload: true,
    });
    userCart(cart, user.token)
      .then((res) => {
        console.log("cart Saved");
        if (res.data.ok) {
          history.push("/checkout");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong, Try Again.");
      });
  };
  return (
    <div className="container-fluid p-5">
      <div className="row">
        <div className="col-md-8 overflow-auto">
          <h4>Cart</h4>
          {!cart.length ? <p>No Products in Cart</p> : showCart()}
          <Link to={"/shop"}>Continue Shopping</Link>
        </div>
        <div className="col-md-4">
          <Card
            title="Order Summary"
            actions={[
              <span>
                {user ? (
                  <button
                    onClick={saveToDB}
                    disabled={!cart.length}
                    className="btn btn-block btn-info"
                  >
                    <ShoppingCartOutlined />
                    Pay Online
                  </button>
                ) : (
                  <Link
                    to={{
                      pathname: "/login",
                      state: {
                        from: "/cart",
                      },
                    }}
                  >
                    <UserOutlined /> Login/Register to continue
                  </Link>
                )}
              </span>,
            ]}
          >
            <ul className="list-group-flush p-0">
              {cart.map((c, i) => (
                <li className="list-group-item d-flex justify-content-between">
                  <span>{`${c.title} x ${c.count}`}</span>
                  <span>{`Rs. ${c.price * c.count}`}</span>
                </li>
              ))}
              <li className="list-group-item d-flex justify-content-between">
                <span>
                  <strong>Total</strong>
                </span>
                <span>{`Rs. ${getTotal()}`}</span>
              </li>
            </ul>
          </Card>
          {user ? (
            <span
              className="btn btn-outline-info btn-block mt-2"
              onClick={saveToDBPOD}
            >
              Pay on Deleivery
            </span>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
