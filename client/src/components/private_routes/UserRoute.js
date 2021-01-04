import React from 'react'
import {Route, Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
import LoadingToRedirect from './LoadingToRedirect'
export default function UserRoute({children, ...rest}) {
    const {user} = useSelector(state =>({...state}));

    return user && user.token?<Route {...rest} render = {() => children}/>:(<LoadingToRedirect/>)
}