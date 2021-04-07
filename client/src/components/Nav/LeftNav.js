import React from "react";
import { Menu, Grid } from "antd";
import { Link } from "react-router-dom";
import { ShoppingOutlined } from "@ant-design/icons";
import ProductSearchForm from "../Forms/ProductSearchForm";
const { useBreakpoint } = Grid;
const LeftNav = () => {
  const { md } = useBreakpoint();
  return (
    <Menu mode={md ? "horizontal" : "inline"} selectedKeys="">
      <Menu.Item key="home">
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item key="shop" icon={<ShoppingOutlined />}>
        <Link to="/shop">Shop</Link>
      </Menu.Item>
      <Menu.Item>
        <ProductSearchForm />
      </Menu.Item>
    </Menu>
  );
};

export default LeftNav;
