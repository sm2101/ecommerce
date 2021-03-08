import axios from 'axios';

export const userCart = async (cart, authToken) => {
    return await axios.post(`${process.env.REACT_APP_API}/user/cart`,{cart},{
        headers:{
            authToken,
        }
    })
}
export const getCart = async (authToken) => {
    return await axios.get(`${process.env.REACT_APP_API}/user/cart`,{
        headers:{
            authToken,
        }
    })
}
export const emptyCart = async (authToken) => {
    return await axios.delete(`${process.env.REACT_APP_API}/user/cart`,{
        headers:{
            authToken,
        }
    })
}
export const saveAddress = async (address, authToken) => {
    return await axios.post(`${process.env.REACT_APP_API}/user/cart`,{address},{
        headers:{
            authToken,
        }
    })
}