import React, { useState } from "react";
import { Card, Tooltip } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { ShowAverage } from "../../Functions/rating";
import { ADD_TO_CART, SET_VISIBLE } from "../../Actions/types";
import { addToWishlisht } from "../../Functions/user";
import { useHistory, useLocation } from "react-router-dom";
import _ from "lodash";
import { toast } from "react-toastify";
const { Meta } = Card;
const UserProductCard = ({ product, wishlist, showBtn }) => {
  const [toolTip, setToolTip] = useState("Click to add");
  const { title, description, images, slug, quantity, price } = product;
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));
  const history = useHistory();
  const location = useLocation();
  const addToCart = () => {
    // cart array
    let cart = [];
    if (typeof window !== "undefined") {
      // if the cart already in local storage
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      // push new product
      cart.push({
        ...product,
        count: 1,
      });
      // remove duplicate
      let unique = _.uniqWith(cart, _.isEqual);
      // save in loca storage
      localStorage.setItem("cart", JSON.stringify(unique));
      setToolTip("Added");
      // dispatch cart to redux
      dispatch({
        type: ADD_TO_CART,
        payload: unique,
      });
      dispatch({
        type: SET_VISIBLE,
        payload: true,
      });
    }
  };
  const loginRedirect = () => {
    history.push({
      pathname: "/login",
      state: {
        from: location.pathname,
      },
    });
  };
  const addWishlist = (e) => {
    addToWishlisht(product._id, user.token).then((res) => {
      if (res.data.ok) {
        toast.success("Added to Wishlist");
      }
    });
  };
  return (
    <>
      <Link to={`/product/${slug}`}>
        <Card
          title={title}
          size="small"
          className="p-2 my-2"
          cover={
            <img
              src={
                images && images.length
                  ? images[0].url
                  : "https://i1.wp.com/fremontgurdwara.org/wp-content/uploads/2020/06/no-image-icon-2.png"
              }
              style={{ height: "8rem", objectFit: "cover" }}
              alt="Product"
            />
          }
        >
          <Meta
            description={`${description && description.substring(0, 50)}...`}
          />
          <div id="rating" className="row">
            <dv className="col-12 d-flex justify-content-between">
              {product && product.rating && product.rating.length > 0 ? (
                ShowAverage(product, false)
              ) : (
                <div
                  className="text-center py-2"
                  style={{ fontSize: "x-small" }}
                >
                  No Ratings yet!
                </div>
              )}
              <div>
                <span>&#8377;</span> {JSON.stringify(price)}
              </div>
            </dv>
          </div>
        </Card>
      </Link>
      {showBtn ? (
        <div className="my-2">
          <div className="row row-eq-height btn-card d-flex justify-content-between h-100">
            {wishlist ? (
              <div className="col">
                <button
                  onClick={!user ? loginRedirect : addWishlist}
                  className="btn text-danger btn-block"
                >
                  {!user ? (
                    "Login"
                  ) : (
                    <>
                      <span className="d-block d-md-none">
                        <HeartOutlined />
                      </span>
                      <span
                        style={{ fontSize: "xx-small" }}
                        className="d-none d-md-block"
                      >
                        <HeartOutlined />
                        <br /> Add to wishLisht
                      </span>
                    </>
                  )}
                </button>
              </div>
            ) : null}
            <div className="col h-100">
              <button
                onClick={addToCart}
                className="btn text-primary btn-block"
                disabled={quantity < 1}
                style={{ fontSize: "x-small" }}
              >
                <Tooltip title={quantity < 1 ? "Out of Stock" : toolTip}>
                  <ShoppingCartOutlined />
                  <br />
                  {quantity < 1 ? "Out of Stock" : "Add to cart"}
                </Tooltip>
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default UserProductCard;
