import "./App.css";
import { useEffect, lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { LOGGED_IN_USER } from "./Actions/types";
import { currentUser } from "./Functions/auth";
import { DotLoader } from "react-spinners";
const Login = lazy(() => import("./components/auth/Login"));
const Register = lazy(() => import("./components/auth/Register"));
const CompleteRegister = lazy(() =>
  import("./components/auth/CompleteRegister")
);
const ForgotPassword = lazy(() => import("./components/auth/ForgotPassword"));
const Landing = lazy(() => import("./components/Landing"));
const Loading = lazy(() => import("./components/Loading/Loading"));
const Footer = lazy(() => import("./components/Footer/Footer"));
const Product = lazy(() => import("./components/Product"));
const Shop = lazy(() => import("./components/Shop"));
const Cart = lazy(() => import("./components/Cart"));
const Payment = lazy(() => import("./components/Payment"));
const Checkout = lazy(() => import("./components/Checkout"));
const Navbar = lazy(() => import("./components/Nav/Navbar"));

const History = lazy(() => import("./components/user/History"));
const Password = lazy(() => import("./components/user/Password"));
const Wishlist = lazy(() => import("./components/user/Wishlist"));
const UserRoute = lazy(() => import("./components/private_routes/UserRoute"));
const AdminRoutes = lazy(() =>
  import("./components/private_routes/AdminRoutes")
);
const Dashboard = lazy(() => import("./components/admin/Dashboard"));
const CreateCategory = lazy(() =>
  import("./components/admin/Category/CreateCategory")
);
const UpdateCategory = lazy(() =>
  import("./components/admin/Category/UpdateCategory")
);
const CreateSubCat = lazy(() =>
  import("./components/admin/SubCategory/CreateSubCat")
);
const UpdateSubCat = lazy(() =>
  import("./components/admin/SubCategory/UpdateSubCat")
);
const CreateProduct = lazy(() =>
  import("./components/admin/Products/CreateProduct")
);
const AllProducts = lazy(() =>
  import("./components/admin/Products/AllProducts")
);
const UpdateProduct = lazy(() =>
  import("./components/admin/Products/UpdateProduct")
);
const CategoryHome = lazy(() => import("./components/Category/CategoryHome"));
const SubCategoryHome = lazy(() =>
  import("./components/Sub Category/SubCategoryHome")
);
const SideCart = lazy(() => import("./components/Drawer/SideCart"));
const CreateCoupon = lazy(() =>
  import("./components/admin/Coupons/CreateCoupon")
);

const App = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => ({ ...state }));
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
      <Suspense
        fallback={
          <div className="loading d-flex justify-content-center align-items-center">
            <DotLoader size={80} />
          </div>
        }
      >
        <div className="container-fluid p-0">
          {loading ? <Loading /> : null}
          <div className="row">
            <div id="topmenu">
              <Navbar />
            </div>
          </div>
          <div className="row p-0" style={{ minHeight: "100vh" }}>
            <div style={{ marginTop: "3.5rem", height: "100%", padding: "0" }}>
              <ToastContainer />
              <SideCart />
              <Switch>
                <Route exact path="/" component={Landing} />
                <Route exact path="/product/:slug" component={Product} />
                <Route exact path="/shop" component={Shop} />
                <Route exact path="/cart" component={Cart} />
                <Route exact path="/category/:slug" component={CategoryHome} />
                <Route
                  exact
                  path="/sub-category/:slug"
                  component={SubCategoryHome}
                />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route
                  exact
                  path="/register/complete"
                  component={CompleteRegister}
                />
                <Route
                  exact
                  path="/forgot/password"
                  component={ForgotPassword}
                />
                <UserRoute exact path="/payment" component={Payment} />
                <UserRoute exact path="/user/history" component={History} />
                <UserRoute exact path="/user/wishlist" component={Wishlist} />
                <UserRoute exact path="/user/password" component={Password} />
                <UserRoute exact path="/checkout" component={Checkout} />
                <AdminRoutes
                  exact
                  path="/admin/dashboard"
                  component={Dashboard}
                />
                <AdminRoutes
                  exact
                  path="/admin/category"
                  component={CreateCategory}
                />
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
                <AdminRoutes
                  exact
                  path="/admin/product"
                  component={CreateProduct}
                />
                <AdminRoutes
                  exact
                  path="/admin/product/:slug"
                  component={UpdateProduct}
                />
                <AdminRoutes
                  exact
                  path="/admin/products"
                  component={AllProducts}
                />
                <AdminRoutes
                  exact
                  path="/admin/coupons"
                  component={CreateCoupon}
                />
              </Switch>
            </div>
          </div>
          <div className="row footer">
            <Footer />
          </div>
        </div>
      </Suspense>
    </>
  );
};

export default App;
