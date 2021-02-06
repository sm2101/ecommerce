import React, {useState,useEffect} from 'react'
import {auth} from '../../firebase';
import {toast} from 'react-toastify';
import {useSelector} from 'react-redux'

const ForgotPassword = ({history}) =>{
    const [email,setEmail] = useState(''),
          [loading,setLoading] = useState(false),
          {user} = useSelector((state) => ({...state}));
    
          useEffect(()=>{
              if(user && user.token){
                  history.push('/');
              }
          },[user,history]);
    const handleSubmit = async (e) =>{
        e.preventDefault();
        setLoading(true);
        const config = {
            url:process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
            handleCdeInApp:true
        }
        await auth.sendPasswordResetEmail(email,config).then(()=>{
            setLoading(false)
            toast.success(`Email has been sent to ${email}.Click it to reset your password`)
            setEmail('');
        }).catch(err =>{
            setLoading(false)
            toast.error(err.message);
        })
    }
          return (
            <div className = 'container p-5 h-75'>
                <div className="row justify-content-center d-flex h-100 auth-box">
                    <div className="col-4 h-100 d-flex justify-content-center auth-side">
                    <h1 className = "display-1">{loading?'Loading':'Reset Password'}</h1>
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
                            autoFocus
                            />
                            <button
                            type = 'submit'
                            className = 'btn btn-primary mt-1'>
                                Reset Password
                            </button>
                        </form>
                        
                    </div>
                </div>
            </div>
        )
}

export default ForgotPassword;