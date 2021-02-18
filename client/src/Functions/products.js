import axios from 'axios';

export const getProducts = async (count) =>{
    return await axios.get(`${process.env.REACT_APP_API}/products/${count}`);
}
export const getProduct = async (slug) =>{
    return await axios.get(`${process.env.REACT_APP_API}/product/${slug}`);
}
export const removeProduct = async (slug, authToken) =>{
    await axios.delete(`${process.env.REACT_APP_API}/product/${slug}`,{
        headers:{
            authToken,
        }
    });
}
export const updateProduct = async (slug,product,authToken) =>{
    await axios.put(`${process.env.REACT_APP_API}/product/${slug}`,product,{
        headers:{
            authToken,
        }
    });
}
export const createProduct = async (product,authToken) =>{
    await axios.post(`${process.env.REACT_APP_API}/product`,product,{
        headers:{
            authToken,
        }
    });
}
