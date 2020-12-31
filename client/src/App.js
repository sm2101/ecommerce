import './App.css';
import {useEffect} from 'react';
import {Switch,Route} from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import CompleteRegister from './components/auth/CompleteRegister';
import Landing from './components/Landing';
import Navbar from './components/Nav/Navbar';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {auth} from './firebase';
import {useDispatch} from 'react-redux';
import {LOGGED_IN_USER} from './Actions/types'
import ForgotPassword from './components/auth/ForgotPassword';
const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const unSubscribe = auth.onAuthStateChanged(async (user) =>{
      if(user){
        const idTokenRes = await user.getIdTokenResult();
        dispatch({
          type:LOGGED_IN_USER,
          payload:{
            email:user.email,
            token: idTokenRes.token
          }
        })
      }
    })
    return () => {
      unSubscribe()
    }
  }, [])
  return (
    <>
    <div className="mx-5 my-3 my-nav">
    <Navbar />
    <ToastContainer />
    </div>
      <Switch>
        <Route exact path = '/' component = {Landing} />
        <Route exact path = '/login' component = {Login} />
        <Route exact path = '/register' component = {Register} />
        <Route exact path = '/register/complete' component = {CompleteRegister} />
        <Route exact path = '/forgot/password' component = {ForgotPassword} />
      </Switch>
    </>
  );
}

export default App;
