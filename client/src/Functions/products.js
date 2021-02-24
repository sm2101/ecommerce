import axios from 'axios';

export const getProducts = async (count) =>{
    return await axios.get(`${process.env.REACT_APP_API}/products/${count}`);
}
export const getProduct = async (slug) =>{
    return await axios.get(`${process.env.REACT_APP_API}/product/${slug}`);
}
export const removeProduct = async (slug, authToken) =>{
    return await axios.delete(`${process.env.REACT_APP_API}/product/${slug}`,{
        headers:{
            authToken,
        }
    });
}
export const updateProduct = async (slug,product,authToken) =>{
    return await axios.put(`${process.env.REACT_APP_API}/product/${slug}`,product,{
        headers:{
            authToken,
        }
    });
}
export const createProduct = async (product,authToken) =>{
    return await axios.post(`${process.env.REACT_APP_API}/product`,product,{
        headers:{
            authToken,
        }
    });
}
export const getProductsLanding = async (sort,order,page) =>{
   return await axios.post(`${process.env.REACT_APP_API}/products`,{
        sort,
        order,
        page
    }
    )
}
export const getTotalProducts = async () =>{
    return await axios.get(`${process.env.REACT_APP_API}/products/total`);
}