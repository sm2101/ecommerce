import React, { useState } from "react";
import { Menu, Drawer } from "antd";
import { Link } from "react-router-dom";
const { Item } = Menu;

const AdminNav = () => {
  const [visible, setVisible] = useState(false);
  return (
    <div className="my-3">
      <button
        className="btn btn-outline-primary btn-block d-block d-md-none"
        onClick={() => setVisible(true)}
      >
        Admin Navigation
      </button>
      <Menu mode="inline" selectedKeys="" className="d-none d-md-block">
        <Item>
          <Link to="/admin/dashboard">Dashboard</Link>
        </Item>
        <Item>
          <Link to="/admin/product">Create Product</Link>
        </Item>
        <Item>
          <Link to="/admin/products">All Products</Link>
        </Item>
        <Item>
          <Link to="/admin/category">Category</Link>
        </Item>
        <Item>
          <Link to="/admin/sub-category">Sub Category</Link>
        </Item>
        <Item>
          <Link to="/admin/coupons">Coupons</Link>
        </Item>
        <Item>
          <Link to="/user/history">History</Link>
        </Item>
        <Item>
          <Link to="/user/password">Change Password</Link>
        </Item>
        <Item>
          <Link to="/user/wishlist">Wishlist</Link>
        </Item>
      </Menu>
      <Drawer
        title="Admin Nav"
        placement="bottom"
        height="70vh"
        closable={false}
        onClose={() => setVisible(false)}
        visible={visible}
      >
        <Menu mode="inline" selectedKeys="">
          <Item>
            <Link to="/admin/dashboard">Dashboard</Link>
          </Item>
          <Item>
            <Link to="/admin/product">Create Product</Link>
          </Item>
          <Item>
            <Link to="/admin/products">All Products</Link>
          </Item>
          <Item>
            <Link to="/admin/category">Category</Link>
          </Item>
          <Item>
            <Link to="/admin/sub-category">Sub Category</Link>
          </Item>
          <Item>
            <Link to="/admin/coupons">Coupons</Link>
          </Item>
          <Item>
            <Link to="/user/history">History</Link>
          </Item>
          <Item>
            <Link to="/user/password">Change Password</Link>
          </Item>
          <Item>
            <Link to="/user/wishlist">Wishlist</Link>
          </Item>
        </Menu>
      </Drawer>
    </div>
  );
};

export default AdminNav;
