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
import {currentUser} from './Functions/auth'
import History from './components/user/History';
import Password from './components/user/Password';
import Wishlist from './components/user/Wishlist';
import UserRoute from './components/private_routes/UserRoute';
import AdminRoutes from './components/private_routes/AdminRoutes';
import Dashboard from './components/admin/Dashboard'

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const unSubscribe = auth.onAuthStateChanged(async (user) =>{
      if(user){
        const idTokenRes = await user.getIdTokenResult();
        currentUser(idTokenRes.token).then((res)=>{
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
        <UserRoute exact path = '/user/history' component = {History} />
        <UserRoute exact path = '/user/wishlist' component = {Wishlist} />
        <UserRoute exact path = '/user/password' component = {Password} />
        <AdminRoutes exact path = '/admin/dashboard' component = {Dashboard} />
      </Switch>
    </>
  );
}

export default App;
