import React, { useEffect, useState } from 'react'
import {Card, Table} from 'antd';
import {useSelector, useDispatch} from 'react-redux'
import {getCart, emptyCart, saveAddress} from '../Functions/user'
import {ADD_TO_CART} from '../Actions/types'
import { toast } from 'react-toastify';
const {Meta} = Card;
const Checkout = ({history}) => {
    const [products, setProducts] = useState([]),
          [total, setTotal] = useState(0);

    const {user} = useSelector(state => ({...state}))
    const dispatch = useDispatch();

    useEffect(() =>{
        getCart(user.token).then(res =>{
            setProducts(res.data.products)
            console.log(res.data.products)
            setTotal(res.data.cartTotal)
        })
    },[])
    const saveAddressToDb = () => {
        //save user address to db
        
      };
    const emptyCartFunc = () =>{
        // from localStorage
        if(typeof window !== 'undefined'){
            localStorage.removeItem('cart');
        }
        // from redux
        dispatch({
            type:ADD_TO_CART,
            payload:[]
        })
        // from db
        emptyCart(user.token).then(res =>{
            toast.success("Your Cart has been dumped.")
            history.push("/")
        })
    }
    return (
        <div className = "container">
            <div className="row">
        <div className="col-md-6">
          <h4>Delivery Address</h4>
          <br />
          <br />
          textarea
          <button className="btn btn-primary mt-2" onClick={saveAddressToDb}>
            Save
          </button>
          <hr />
          <h4>Got Coupon?</h4>
          <br />
          coupon input and apply button
        </div>
  
        <div className="col-md-6">
        <Card
                    actions = {
                        [
                            <button className = "btn btn-success">
                                Place Order
                            </button>,
                            <button className = "btn btn-outline-danger" onClick = {emptyCartFunc}>
                                Empty Cart
                            </button>
                        ]
                    }
                    >
                        <Meta title = "Order Summary" />
                        <ul className = "list-group-flush p-0">
                            {products.map((c,i) =>(
                                <li className="list-group-item d-flex justify-content-between">
                                <span>
                                    {`${c.product.title} x ${c.count}`}
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
                                    {`Rs. ${total}`}
                                </span>
                            </li>
                        </ul>
                    </Card>
        </div>
      </div>
        </div>
    )
}

export default Checkout
