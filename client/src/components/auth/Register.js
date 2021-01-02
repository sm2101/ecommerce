import React, {useState,useEffect} from 'react'
import { auth} from '../../firebase';
import {toast} from 'react-toastify';
import {useSelector} from 'react-redux'
const Register =({history}) => {
    const [email, setEmail] = useState(""),
    [loading, setLoading] = useState(false),
    {user} = useSelector((state) => ({...state}));

    useEffect(()=>{
        if(user && user.token){
            history.push('/');
        }
    },[user]);
    const handleSubmit = async (e) =>{
        setLoading(true)
        e.preventDefault();
        const config = {
            url : process.env.REACT_APP_REGISTER_REDIRECT_URL,
            handleCodeInApp : true
        }
        await auth.sendSignInLinkToEmail(this.state.email,config).then(() =>{
            setLoading(false)
            toast.success(`Email is sent to ${this.state.email}. Click the link to register`);
            window.localStorage.setItem('registerEmail',this.state.email);
            setEmail('');  
        }).catch(err =>{
            toast.error(err.message);
        })
    }
        return (
            <div className = 'container p-5 h-75'>
                <div className="row justify-content-center d-flex h-100 auth-box">
                    <div className="col-4 h-100 d-flex justify-content-center auth-side">
                    <h1 className = "display-1">{loading?'Loading':'Register'}</h1>
                    </div>
                    <div className="col-8 h-100 auth-form">
                        <form onSubmit = {handleSubmit}>
                            <input 
                            type = 'email' 
                            className = "form-control" 
                            name = 'email' 
                            value = {email} 
                            onChange = {e =>setEmail(e.target.value)}
                            placeholder = "Email"
                            autoFocus
                            />
                            <button
                            type = 'submit'
                            className = 'btn btn-primary mt-1'>
                                Register
                            </button>
                        </form>
                        
                    </div>
                </div>
            </div>
        )
    }

export default Register;
