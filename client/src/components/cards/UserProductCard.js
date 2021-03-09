import React, { useState } from "react";
import { Card, Tooltip } from "antd";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { ShowAverage } from "../../Functions/rating";
import { ADD_TO_CART, SET_VISIBLE } from "../../Actions/types";
import _ from "lodash";
const { Meta } = Card;
const UserProductCard = ({ product }) => {
  const [toolTip, setToolTip] = useState("Click to add");
  const { title, description, images, slug, quantity } = product;
  const dispatch = useDispatch();
  const { user, cart } = useSelector((state) => ({ ...state }));
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
  return (
    <>
      <div id="rating">
        {product && product.rating && product.rating.length > 0 ? (
          ShowAverage(product)
        ) : (
          <div className="text-center py-2">No Ratings yet!</div>
        )}
      </div>
      <Card
        className="p-2"
        cover={
          <img
            src={
              images && images.length
                ? images[0].url
                : "https://i1.wp.com/fremontgurdwara.org/wp-content/uploads/2020/06/no-image-icon-2.png"
            }
            style={{ height: "150px", objectFit: "cover" }}
            alt="Product"
          />
        }
        actions={[
          <Link to={`/product/${slug}`}>
            <EyeOutlined className="text-primary" /> <br />
            <span className="text-primary card-action-text">View Product</span>
          </Link>,
          <Tooltip title={quantity < 1 ? "Out of Stock" : toolTip}>
            <a onClick={addToCart} disabled={quantity < 1}>
              <ShoppingCartOutlined className="text-primary" />
              <br />
              <span className="text-primary card-action-text">
                {quantity < 1 ? "Out of Stock" : " Add to cart"}
              </span>
            </a>
          </Tooltip>,
        ]}
      >
        <Meta
          title={title}
          description={`${description && description.substring(0, 50)}...`}
        />
      </Card>
    </>
  );
};

export default UserProductCard;
