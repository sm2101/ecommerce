import React from "react";
import { Menu, Badge, Grid } from "antd";
import { useLocation } from "react-router-dom";
import {
  ShoppingCartOutlined,
  UserOutlined,
  UserAddOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
const { SubMenu } = Menu;
const { useBreakpoint } = Grid;
const RightNav = ({ user, cart, logout }) => {
  const { md } = useBreakpoint();
  const location = useLocation();
  return (
    <Menu mode={md ? "horizontal" : "inline"} selectedKeys="">
      {!user && (
        <>
          <Menu.Item key="Register" icon={<UserAddOutlined />}>
            <Link to="/register">Register</Link>
          </Menu.Item>
          <Menu.Item key="Login" icon={<UserOutlined />}>
            <Link
              to={{
                pathname: "/login",
                state: {
                  from: location.pathname,
                },
              }}
            >
              Login
            </Link>
          </Menu.Item>
        </>
      )}
      {user && (
        <SubMenu title={user.name ? user.name : user.email}>
          {user.role === "admin" && (
            <Menu.Item key="setting:1">
              <Link to="/admin/dashboard">Dashboard</Link>
            </Menu.Item>
          )}

          {user.role === "Customer" && (
            <>
              <Menu.Item key="setting:1">
                <Link to="/user/history">History</Link>
              </Menu.Item>
              <Menu.Item key="setting:2">
                <Link to="/user/password">Change Password</Link>
              </Menu.Item>
              <Menu.Item key="setting:3">
                <Link to="/user/wishlist">Wishlist</Link>
              </Menu.Item>
            </>
          )}

          <Menu.Item key="setting:4" icon={<LogoutOutlined />} onClick={logout}>
            Logout
          </Menu.Item>
        </SubMenu>
      )}
      <Menu.Item key="Cart" icon={<ShoppingCartOutlined />}>
        <Link to="/cart">
          <Badge count={cart.length} offset={[9, 0]}>
            Cart
          </Badge>
        </Link>
      </Menu.Item>
    </Menu>
  );
};

export default RightNav;
