import React, { useState } from "react";
import LeftNav from "./LeftNav";
import RightNav from "./RightNav";
import { Drawer, Button } from "antd";
import { Link } from "react-router-dom";
import firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { LOGOUT } from "../../Actions/types";
const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch(),
    history = useHistory(),
    { user, cart } = useSelector((state) => ({ ...state }));
  const logout = () => {
    firebase.auth().signOut();
    dispatch({
      type: LOGOUT,
      payload: null,
    });
    history.push("/");
  };
  return (
    <nav className="menuBar w-100 menubar-dark">
      <div className="logo">
        <Link to="/">Ecom</Link>
      </div>
      <div className="menuCon">
        <div className="leftMenu d-none d-lg-block">
          <LeftNav />
        </div>
        <div className="rightMenu d-none d-lg-block">
          <RightNav user={user} cart={cart} logout={logout} />
        </div>
        <Button
          className="barsMenu d-block d-lg-none "
          type="primary"
          onClick={() => setVisible(true)}
        >
          <span className="barsBtn"></span>
        </Button>
        <Drawer
          title="Navigation Menu"
          placement="right"
          closable={false}
          onClose={() => setVisible(false)}
          visible={visible}
        >
          <LeftNav />
          <RightNav user={user} cart={cart} logout={logout} />
        </Drawer>
      </div>
    </nav>
  );
};

export default Navbar;
