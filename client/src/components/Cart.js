import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Link} from "react-router-dom"
import {Card, Table} from 'antd';
import CartProduct from '../components/cards/CartProduct'
import {userCart} from '../Functions/user'
import {ShoppingCartOutlined, UserOutlined} from '@ant-design/icons';
import { toast } from 'react-toastify';
const {Meta} = Card
const Cart = ({history}) => {
    const {user,cart} = useSelector(state => ({...state}))
    const getTotal = () =>{
        return cart.reduce((prev,next) =>{
            return prev + next.count * next.price
        },0)
    }
    const showCart = () => (
        <table className = "table table-bordered">
            <thead className = "thead-light">
                <tr>
                    <th scope = "col">
                        Image(s)
                    </th>
                    <th scope = "col">
                        Title
                    </th>
                    <th scope = "col">
                        Price
                    </th>
                    <th scope = "col">
                        Quantity
                    </th>
                    <th scope = "col">
                        Color
                    </th>
                    <th scope = "col">
                        Shipping
                    </th>
                    <th scope = "col">
                        Remove
                    </th>
                </tr>
            </thead>
            <tbody>
                {cart.map(p => (
                    <CartProduct p = {p} />
                ))}
            </tbody>
        </table>
    )
    const saveToDB = () =>{
        userCart(cart,user.token).then(res =>{
            console.log("cart Saved")
            if(res.data.ok){
                history.push("/checkout")
            }
        }).catch(err =>{
            console.log(err);
            toast.error("Something went wrong, Try Again.")
        })
    }
    return (
        <div className = "container-fluid p-5">
            <div className="row">
                <div className="col-md-8 overflow-auto">
                <h4>Cart</h4>
                    {!cart.length ? <p>No Products in Cart</p>:showCart()}
                    <Link to = {'/shop'}>Continue Shopping</Link>
                </div>
                <div className="col-md-4">
                    <Card
                    actions = {
                        [
                            <span>
                                {user?(
                                    <button onClick = {saveToDB} disabled = {!cart.length} className = "btn">
                                    <ShoppingCartOutlined />
                                    Procced to Checkout
                                    </button>
                                ):(
                                    <Link to = {{
                                        pathname:"/login",
                                        state:{
                                            from:"/cart"
                                        }
                                    }}>
                                        <UserOutlined/> Login/Register to continue
                                    </Link>
                                )}
                            </span>
                        ]
                    }
                    >
                        <Meta title = "Order Summary" />
                        <ul className = "list-group-flush p-0">
                            {cart.map((c,i) =>(
                                <li className="list-group-item d-flex justify-content-between">
                                <span>
                                    {`${c.title} x ${c.count}`}
                                </span>
                                <span>
                                    {`Rs. ${c.price*c.count}`}
                                </span>
                            </li>
                            ))}
                            <li className="list-group-item d-flex justify-content-between">
                                <span>
                                    <strong>Total</strong>
                                </span>
                                <span>
                                    {`Rs. ${getTotal()}`}
                                </span>
                            </li>
                        </ul>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default Cart
