import React from 'react'
import ModalImage from 'react-modal-image';
import {ADD_TO_CART} from '../../Actions/types'
import {useDispatch} from 'react-redux';
import {CheckCircleOutlined,CloseCircleOutlined, CloseOutlined} from '@ant-design/icons';
import { toast } from 'react-toastify';
const CartProduct = ({p}) => {
    const dispatch = useDispatch();
    const handleCount = (e) =>{
        let c = e.target.value < 1? 1: e.target.value;
        if( c > p.quantity){
            toast.error(`Max avaailable quantity: ${p.quantity}`)
            return;
        }
        let cart = []
        if(typeof window !== 'undefined'){
            if(localStorage.getItem('cart')){
                cart = JSON.parse(localStorage.getItem('cart'))
            }
            cart.map((prod,i) => {
                if(prod._id == p._id ){
                    cart[i].count = c
                }
            })
            localStorage.setItem('cart', JSON.stringify(cart))
            dispatch({
                type:ADD_TO_CART,
                payload:cart
            })
        }
    }
    const handleRemove = (e) =>{
        let cart = []
        if(typeof window !== 'undefined'){
            if(localStorage.getItem('cart')){
                cart = JSON.parse(localStorage.getItem('cart'))
            }
            cart.map((prod,i) => {
                if(prod._id == p._id ){
                    cart.splice(i,1)
                }
            })
            localStorage.setItem('cart', JSON.stringify(cart))
            dispatch({
                type:ADD_TO_CART,
                payload:cart
            })
        }
    }
    return (
        <tr>
                        <td>
                            <div style = {{width:"150px",height:"auto"}}>
                                {p.images.length? (
                                    <ModalImage 
                                    small = {p.images[0].url}
                                    large = {p.images[0].url} 
                                    />
                                ):(
                                    <ModalImage 
                                    small = {"https://i1.wp.com/fremontgurdwara.org/wp-content/uploads/2020/06/no-image-icon-2.png"}
                                    large = {"https://i1.wp.com/fremontgurdwara.org/wp-content/uploads/2020/06/no-image-icon-2.png"} 
                                    />
                                )}
                            </div>
                        </td>
                        <td>
                            {p.title}
                        </td>
                        <td>
                            {p.price}
                        </td>
                        <td>
                            <input 
                            type = "number" 
                            className = "text-center form-control"
                            value = {p.count}
                            onChange = {handleCount}
                            ></input>
                        </td>
                        <td>
                            {p.color}
                        </td>
                        <td>
                            {p.shipping == "Yes" ? <CheckCircleOutlined className = "text-success"/> : <CloseCircleOutlined className = "text-danger" />}
                        </td>
                        <td>
                            <button className = "btn btn-danger d-flex justify-content-around align-item-center" onClick = {handleRemove}>
                                <span>
                                <CloseOutlined />
                                </span>Remove
                            </button>
                        </td>
                    </tr>
    )
}

export default CartProduct
