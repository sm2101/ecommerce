import "./App.css";
import { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import CompleteRegister from "./components/auth/CompleteRegister";
import Landing from "./components/Landing";
import Product from "./components/Product";
import Shop from "./components/Shop";
import Cart from "./components/Cart";
import Payment from "./components/Payment";
import Checkout from "./components/Checkout";
import Navbar from "./components/Nav/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { LOGGED_IN_USER } from "./Actions/types";
import ForgotPassword from "./components/auth/ForgotPassword";
import { currentUser } from "./Functions/auth";
import History from "./components/user/History";
import Password from "./components/user/Password";
import Wishlist from "./components/user/Wishlist";
import UserRoute from "./components/private_routes/UserRoute";
import AdminRoutes from "./components/private_routes/AdminRoutes";
import Dashboard from "./components/admin/Dashboard";
import CreateCategory from "./components/admin/Category/CreateCategory";
import UpdateCategory from "./components/admin/Category/UpdateCategory";
import CreateSubCat from "./components/admin/SubCategory/CreateSubCat";
import UpdateSubCat from "./components/admin/SubCategory/UpdateSubCat";
import CreateProduct from "./components/admin/Products/CreateProduct";
import AllProducts from "./components/admin/Products/AllProducts";
import UpdateProduct from "./components/admin/Products/UpdateProduct";
import CategoryHome from "./components/Category/CategoryHome";
import SubCategoryHome from "./components/Sub Category/SubCategoryHome";
import SideCart from "./components/Drawer/SideCart";
import CreateCoupon from "./components/admin/Coupons/CreateCoupon";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const unSubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenRes = await user.getIdTokenResult();
        currentUser(idTokenRes.token)
          .then((res) => {
            dispatch({
              type: LOGGED_IN_USER,
              payload: {
                name: res.data.name,
                email: res.data.email,
                role: res.data.role,
                token: idTokenRes.token,
                _id: res.data._id,
              },
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
    return () => {
      unSubscribe();
    };
  }, [dispatch]);
  return (
    <>
      <div className="mx-5 my-3 my-nav">
        <Navbar />
        <ToastContainer />
      </div>
      <SideCart />
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/product/:slug" component={Product} />
        <Route exact path="/shop" component={Shop} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/category/:slug" component={CategoryHome} />
        <Route exact path="/sub-category/:slug" component={SubCategoryHome} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/register/complete" component={CompleteRegister} />
        <Route exact path="/forgot/password" component={ForgotPassword} />
        <UserRoute exact path="/payment" component={Payment} />
        <UserRoute exact path="/user/history" component={History} />
        <UserRoute exact path="/user/wishlist" component={Wishlist} />
        <UserRoute exact path="/user/password" component={Password} />
        <UserRoute exact path="/checkout" component={Checkout} />
        <AdminRoutes exact path="/admin/dashboard" component={Dashboard} />
        <AdminRoutes exact path="/admin/category" component={CreateCategory} />
        <AdminRoutes
          exact
          path="/admin/sub-category"
          component={CreateSubCat}
        />
        <AdminRoutes
          exact
          path="/admin/category/:slug"
          component={UpdateCategory}
        />
        <AdminRoutes
          exact
          path="/admin/sub-category/:slug"
          component={UpdateSubCat}
        />
        <AdminRoutes exact path="/admin/product" component={CreateProduct} />
        <AdminRoutes
          exact
          path="/admin/product/:slug"
          component={UpdateProduct}
        />
        <AdminRoutes exact path="/admin/products" component={AllProducts} />
        <AdminRoutes exact path="/admin/coupons" component={CreateCoupon} />
      </Switch>
    </>
  );
};

export default App;
