import axios from 'axios';

export const getAllSubCat = async () =>{
    return await axios.get(`${process.env.REACT_APP_API}/sub-categories`);
}
export const getSubCat = async (slug) =>{
    return await axios.get(`${process.env.REACT_APP_API}/sub-category/${slug}`);
}
export const removeSubCat = async (slug, authToken) =>{
    await axios.delete(`${process.env.REACT_APP_API}/sub-category/${slug}`,{
        headers:{
            authToken,
        }
    });
}
export const updateSubCat = async (slug,subCat,authToken) =>{
    await axios.put(`${process.env.REACT_APP_API}/sub-category/${slug}`,subCat,{
        headers:{
            authToken,
        }
    });
}
export const createSubCat = async (subCat,authToken) =>{
    await axios.post(`${process.env.REACT_APP_API}/sub-category`,subCat,{
        headers:{
            authToken,
        }
    });
}
