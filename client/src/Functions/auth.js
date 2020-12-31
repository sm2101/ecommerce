import axios from 'axios';
export const createOrUpdateUser = async (authToken) =>{
    return await axios.post(`${process.env.REACT_APP_API}/createUser`,{},{
        headers:{
            authToken
        }
    })
}
export const currentUser = async (authToken) =>{
    return await axios.post(`${process.env.REACT_APP_API}/currentUser`,{},{
        headers:{
            authToken
        }
    })
}