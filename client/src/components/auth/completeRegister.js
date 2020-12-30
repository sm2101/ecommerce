import React, { Component,useState, useEffect } from 'react'
import { auth} from '../../firebase';
import {toast} from 'react-toastify';
import { Result } from 'antd';
export default class completeRegister extends Component {
    constructor(props){
        super(props);
        this.state = {
            email:'',
            password:''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount(){
        this.setState({
            email:window.localStorage.getItem('registerEmail')
        })
    }
    handleChange(e){
        this.setState({
            [e.target.name]:e.target.value
        })

    }
    async handleSubmit(e){
        e.preventDefault();
        try {
            const res = await auth.signInWithEmailLink(this.state.email,window.location.href);
            if(res.user.emailVerified){
                // clear local storage
                window.localStorage.removeItem('registerEmail');
                // get user id token
                let user = auth.currentUser
                await user.updatePassword(this.state.password);
                const idTokenRes = await user.getIdTokenResult();
                // populate redux store
                // redirect
                const { history } = this.props;
                history.push('/');
            }
        } catch(err){
            console.log(err);
            toast.error(err.message);
        }
    }
    render() {
        return (
            <div className = 'container p-5 h-75'>
                <div className="row justify-content-center d-flex h-100 auth-box">
                    <div className="col-4 h-100 d-flex justify-content-center auth-side">
                    <h1 className = "display-3">Complete Registeration</h1>
                    </div>
                    <div className="col-8 h-100 auth-form">
                        <form onSubmit = {this.handleSubmit}>
                            <input 
                            type = 'email' 
                            className = "form-control" 
                            name = 'email' 
                            value = {this.state.email} 
                            placeholder = "Email"
                            />
                            <input 
                            type = 'password' 
                            className = "form-control" 
                            name = 'password' 
                            value = {this.state.password} 
                            onChange = {this.handleChange}
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
}
