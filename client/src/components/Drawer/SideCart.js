import React from "react";
import { Drawer, Button, Card } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { SET_VISIBLE } from "../../Actions/types";
import { ShoppingCartOutlined } from "@ant-design/icons";

const { Meta } = Card;
const SideCart = () => {
  const dispatch = useDispatch();
  const { drawer, cart } = useSelector((state) => ({ ...state }));
  const closeDrawer = () => {
    dispatch({
      type: SET_VISIBLE,
      payload: false,
    });
  };
  return (
    <Drawer
      visible={drawer}
      onClose={closeDrawer}
      title={`Cart - ${cart.length} Product(s)`}
    >
      <Link to={`/cart`} className="p-2">
        <Button className="btn btn-primary btn-block" onClick={closeDrawer}>
          <ShoppingCartOutlined /> Go to Cart
        </Button>
      </Link>
      {cart.map((p) => (
        <Card
          className="p-2 mb-2"
          cover={
            <img
              src={
                p.images && p.images.length
                  ? p.images[0].url
                  : "https://i1.wp.com/fremontgurdwara.org/wp-content/uploads/2020/06/no-image-icon-2.png"
              }
              style={{ height: "150px", objectFit: "cover" }}
              alt="Product"
            />
          }
        >
          <Meta
            title={p.title}
            description={`${
              p.description && p.description.substring(0, 50)
            }...`}
          />
        </Card>
      ))}
    </Drawer>
  );
};

export default SideCart;
