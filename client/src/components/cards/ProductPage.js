import React, { useState } from "react";
import { Card, Tabs, Tooltip } from "antd";
import { Link } from "react-router-dom";
import {
  HeartOutlined,
  ShoppingCartOutlined,
  StarOutlined,
} from "@ant-design/icons";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import StartRatings from "react-star-ratings";
import RatingModal from "../modal/RatingModal";
import { ShowAverage } from "../../Functions/rating";
import { ADD_TO_CART, SET_VISIBLE } from "../../Actions/types";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";

const { TabPane } = Tabs;

const ProductPage = ({ product, star, onStarClick }) => {
  const {
    title,
    description,
    images,
    slug,
    price,
    color,
    category,
    subCat,
    shipping,
    quantity,
    _id,
  } = product;
  const [toolTip, setToolTip] = useState("Click to add");
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
      <div className="col-12 col-md-7">
        <div className="row">
          {images && images.length ? (
            <Carousel
              showArrows={true}
              autoPlay
              infiniteLoop
              className="height-25"
            >
              {images &&
                images.map((i) => <img src={i.url} key={i.public_id}></img>)}
            </Carousel>
          ) : (
            <Card
              cover={
                <img
                  src="https://i1.wp.com/fremontgurdwara.org/wp-content/uploads/2020/06/no-image-icon-2.png"
                  style={{ height: "25rem", objectFit: "cover" }}
                  alt="Default"
                />
              }
            ></Card>
          )}
        </div>
        <div className="row mt-3">
          <Tabs type="card">
            <TabPane tab="Description" key="1">
              {description}
            </TabPane>
          </Tabs>
        </div>
      </div>
      <div className="col-12 col-md-5">
        <div>
          <h1 className="display-3">{title}</h1>
          {product && product.rating && product.rating.length > 0 ? (
            ShowAverage(product)
          ) : (
            <div className="text-center py-2">No Ratings yet!</div>
          )}
        </div>
        <Card
          actions={[
            <Tooltip title={quantity < 1 ? "Out of Stock" : toolTip}>
              <a onClick={addToCart} disabled={quantity < 1}>
                <ShoppingCartOutlined className="text-primary" />
                <br />
                <span className="text-primary card-action-text">
                  {quantity < 1 ? "Out of Stock" : " Add to cart"}
                </span>
              </a>
            </Tooltip>,
            <>
              <HeartOutlined className="text-danger" /> Add to wishLisht
            </>,
            <RatingModal>
              <StartRatings
                name={_id}
                numberOfStars={5}
                rating={star}
                changeRating={onStarClick}
                isSelectable={true}
                starRatedColor="#437846"
              />
            </RatingModal>,
          ]}
        >
          <ul className="list-group-flush p-0">
            <li className="list-group-item d-flex justify-content-between">
              <span>Price</span>
              <span>{price}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <span>Category</span>
              <span>
                {category && (
                  <Link to={`/category/${category.slug}`}>{category.name}</Link>
                )}
              </span>
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <span>Sub Categories</span>
              {subCat &&
                subCat.map((s) => (
                  <span>
                    <Link to={`/sub-category/${s.slug}`}>{s.name}</Link>
                  </span>
                ))}
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <span>Shipping</span>
              <span>{shipping}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <span>Color</span>
              <span>{color}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <span>Quantity</span>
              <span>{quantity}</span>
            </li>
          </ul>
        </Card>
      </div>
    </>
  );
};

export default ProductPage;
