import React, {useState,useEffect} from 'react'
import {auth, googleAuthProvider} from '../../firebase';
import {toast} from 'react-toastify';
import {useDispatch,useSelector} from 'react-redux';
import {LOGGED_IN_USER} from '../../Actions/types';
import {Link} from 'react-router-dom';
import { Button } from 'antd';
import { GoogleOutlined} from '@ant-design/icons';
import {createOrUpdateUser} from '../../Functions/auth';


const Login  = ( { history } ) => {
    const [email, setEmail]       = useState(""),
          [password, setPassword] = useState(""),
          [loading, setLoading]   = useState(false),
          {user}                  = useSelector((state) => (
              {...state}
          )),
          dispatch                = useDispatch();

    const googleLogin = async () =>{
        
        setLoading(true);

        auth.signInWithPopup(googleAuthProvider)
        .then(async (res)=>{
            setLoading(false);

            const {user} = res;
            await user.getIdTokenResult()
            .then((r)=>{
                createOrUpdateUser(r.token)
                .then((res)=>{
                    dispatch({
                        type:LOGGED_IN_USER,
                        payload:{
                          name:res.data.name,
                          email:res.data.email,
                          token: r.token,
                          _id:res.data._id
                        }
                    });
                }).catch(err =>{
                       console.log(err);
                })
                history.push('/');
            })
            
        }).catch(err =>{
            setLoading(false);
            console.log(err);
            toast.error(err.message);
        })
    }

    // everytime component mounts
    useEffect(()=>{
        if(user && user.token){
            history.push('/');
        }
    },[user]);

    const handleSubmit = async (e) =>{ //on form submit
        
        e.preventDefault();
        setLoading(true);
       try{
           const res       = await auth.signInWithEmailAndPassword(email, password),
                {user}     = res,
                idTokenRes = await user.getIdTokenResult();

           createOrUpdateUser(idTokenRes.token)
           .then((res)=>{
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
          history.push('/')
       }
       catch(err){
           console.log(err);
           toast.error(err.message);
           setLoading(false);
       }
    }
        return (
            <div className = 'container p-5 h-75'>
                <div className="row justify-content-center d-flex h-100 auth-box">
                    <div className="col-4 h-100 d-flex justify-content-center auth-side">
                        <div className="container">
                            <div className="row m-0">
                            <h1 className = "display-1 col-12 m-0">{loading?'Loading':'Login'}</h1>
                        <div className="col-12 social-auth">
                        <Button type="danger" shape="circle" icon={<GoogleOutlined />} size='large'  onClick = {googleLogin}/>
                        </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-8 h-100 auth-form">
                        <form onSubmit = {handleSubmit}>
                            <input 
                            type = 'email' 
                            className = "form-control" 
                            name = 'email' 
                            value = {email}
                            onChange = {e => setEmail(e.target.value)} 
                            placeholder = "Email"
                            required
                            />
                            <input 
                            type = 'password' 
                            className = "form-control" 
                            name = 'password' 
                            value = {password} 
                            onChange = {e =>setPassword(e.target.value)}
                            placeholder = "Password"
                            required
                            />
                            <button
                            type = 'submit'
                            autoFocus
                            className = 'btn btn-primary mt-2'
                            >
                                Login
                            </button>
                            <Link 
                            to = '/forgot/password' 
                            className = "float-end text-secondary"
                            >
                                Forgot Password?
                            </Link>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

export default Login;
