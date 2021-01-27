import React, { useState, useEffect } from 'react'
import { auth} from '../../firebase';
import {toast} from 'react-toastify';
import {useDispatch,useSelector} from 'react-redux';
import {createOrUpdateUser} from '../../Functions/auth'
import {LOGGED_IN_USER} from '../../Actions/types'


const CompleteRegister =({history})=>{
    const [email,setEmail] = useState(''),
          [password,setPassword] = useState(''),
          dispatch = useDispatch(),
          {user} = useSelector((state) => ({...state}));
    useEffect(()=>{
        setEmail(window.localStorage.getItem('registerEmail'))
    },[])

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try {
            const res = await auth.signInWithEmailLink(email,window.location.href);
            if(res.user.emailVerified){
                // clear local storage
                window.localStorage.removeItem('registerEmail');
                // get user id token
                let user = auth.currentUser
                await user.updatePassword(password);
                const idTokenRes = await user.getIdTokenResult();
                createOrUpdateUser(idTokenRes.token).then((res)=>{
                    dispatch({
                        type:LOGGED_IN_USER,
                        payload:{
                          name:res.data.name,
                          email:res.data.email,
                          token: idTokenRes.token,
                          _id:res.data._id
                        }
                      });
                   }).catch(err =>{
                       console.log(err);
                   })
                   history.push('/');
            }
        } catch(err){
            console.log(err);
            toast.error(err.message);
        }
    }
        return (
            <div className = 'container p-5 h-75'>
                <div className="row justify-content-center d-flex h-100 auth-box">
                    <div className="col-4 h-100 d-flex justify-content-center auth-side">
                    <h1 className = "display-3">Complete Registeration</h1>
                    </div>
                    <div className="col-8 h-100 auth-form">
                        <form onSubmit = {handleSubmit}>
                            <input 
                            type = 'email' 
                            className = "form-control" 
                            name = 'email' 
                            value = {email} 
                            placeholder = "Email"
                            />
                            <input 
                            type = 'password' 
                            className = "form-control" 
                            name = 'password' 
                            value = {password} 
                            onChange = {(e) =>{setPassword(e.target.value)}}
                            placeholder = "Password"
                            autoFocus
                            />
                            <button
                            type = 'submit'
                            autoFocus
                            className = 'btn btn-primary mt-1'>
                                Register
                            </button>
                        </form>
                        
                    </div>
                </div>
            </div>
        )
    }
export default CompleteRegister;