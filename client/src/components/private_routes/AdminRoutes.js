import React ,{useEffect, useState} from 'react'
import {Route, Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
import LoadingToRedirect from './LoadingToRedirect';
import {currentAdmin} from '../../Functions/auth';

export default function AdminRoutes({children, ...rest}) {
    const {user} = useSelector(state =>({...state}));
    const [ok,setOk] = useState(false);

    useEffect(()=>{
        if(user&&user.token){
            currentAdmin(user.token).then((res)=>{
                console.log(res);
                setOk(true)
            }).catch((err)=>{
                console.log(err)
            })
        }
    },[user])

    return ok?(
    <Route {...rest} />
    ):(
    <LoadingToRedirect/>
    )
}
