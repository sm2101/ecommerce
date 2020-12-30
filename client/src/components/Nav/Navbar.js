import React, {useState} from 'react'
import {Menu} from 'antd';
import { UserOutlined ,UserAddOutlined, ShoppingOutlined, LogoutOutlined} from '@ant-design/icons';
import {Link} from 'react-router-dom';
import firebase from 'firebase';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import { LOGOUT } from '../../Actions/types';
const { SubMenu } = Menu;
const Navbar = () => {
  const [current, setCurrent] = useState("home");
  const dispatch = useDispatch(),
        history = useHistory(),
        {user} = useSelector((state)=>({...state}));
  const handleClick = e => {
        setCurrent(e.key)
      };
  const logout = () =>{
      firebase.auth().signOut();
      dispatch({
        type : LOGOUT,
        payload:null
      });
      history.push('/');
    }
        return (
              <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal" className = "my-nav">
                <Menu.Item key="home">
                <img className="nav-logo" src = 'https://i.imgur.com/UxLSv9T.png'/>
                  <span><Link to = '/'>Aura</Link></span>
                </Menu.Item>
                <Menu.Item key="about">
                <Link to = '/about'>About Us</Link>
                </Menu.Item>
                <SubMenu title="Shop" icon = {<ShoppingOutlined />}>
                  <Menu.ItemGroup title="Item 1">
                    <Menu.Item key="setting:1">Option 1</Menu.Item>
                    <Menu.Item key="setting:2">Option 2</Menu.Item>
                  </Menu.ItemGroup>
                  <Menu.ItemGroup title="Item 2">
                    <Menu.Item key="setting:3">Option 3</Menu.Item>
                    <Menu.Item key="setting:4">Option 4</Menu.Item>
                  </Menu.ItemGroup>
                </SubMenu>
                {!user && (
                  <>
                    <Menu.Item key="Register" icon = {<UserAddOutlined />} className = "float-end" >
                      <Link to = '/register'>Register</Link>
                    </Menu.Item>
                    <Menu.Item key="Login" icon = {<UserOutlined />} className = "float-end">
                      <Link to = '/login'>Login</Link>
                    </Menu.Item>
                  </>
                )}
                {user && (
                  <SubMenu title={user.email} className = "float-end">
                    <Menu.Item key="setting:1">Dashboard</Menu.Item>
                    <Menu.Item key="setting:2" icon = {<LogoutOutlined />} onClick = {logout}>Logout</Menu.Item>
                </SubMenu>
                )}
              </Menu>
            );
    }

export default Navbar;
