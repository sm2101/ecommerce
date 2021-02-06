import React,{useState} from 'react';
import {auth} from '../../firebase';
import {toast} from 'react-toastify';


const Password =() => {
    const [password,setPassword] = useState(''),
          [loading, setLoading]  = useState(false);

    const handleSubmit = async (e) =>{
        setLoading(true);
        e.preventDefault();
        await auth.currentUser.updatePassword(password).then((res)=>{
            setLoading(false);
            toast.success('Password Updated');
        }).catch(err =>{
            setLoading(false);
            toast.error(err.message);
        })
    }
    return (
        <div className = "container h-75 p-5 ">
            <div className="row h-100 m-0 justify-conetnt-center d-flex auth-box">
                        <div className="col-4 h-100 d-flex justify-content-center auth-side">
                            <h1 className = "display-1">{loading?'Loading':'Change Password'}</h1>
                        </div>
                    <div className="col-8 h-100 auth-form">
                        <form onSubmit = {handleSubmit}>
                            <input 
                            type = 'password' 
                            className = "form-control" 
                            name = 'password' 
                            value = {password} 
                            onChange = {e =>setPassword(e.target.value)}
                            placeholder = "New Password"
                            autoFocus
                            required
                            disabled = {loading}
                            />
                            <button
                            type = 'submit'
                            className = 'btn btn-primary mt-1'
                            disabled = {!password || loading}
                            >
                                Change Password
                            </button>
                        </form>
                </div>
            </div>
        </div>
    )
}

export default Password;