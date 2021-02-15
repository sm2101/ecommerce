import axios from 'axios';

export const getAllCategories = async () =>{
    return await axios.get(`${process.env.REACT_APP_API}/categories`);
}
export const getCategory = async (slug) =>{
    return await axios.get(`${process.env.REACT_APP_API}/category/${slug}`);
}
export const removeCategory = async (slug, authToken) =>{
    await axios.delete(`${process.env.REACT_APP_API}/category/${slug}`,{
        headers:{
            authToken,
        }
    });
}
export const updateteCategory = async (slug,category,authToken) =>{
    await axios.put(`${process.env.REACT_APP_API}/category/${slug}`,category,{
        headers:{
            authToken,
        }
    });
}
export const createCategory = async (category,authToken) =>{
    await axios.post(`${process.env.REACT_APP_API}/category`,category,{
        headers:{
            authToken,
        }
    });
}
export const getCategorySubs = async (id) =>{
    return await axios.get(`${process.env.REACT_APP_API}/category/subs/${id}`);
}