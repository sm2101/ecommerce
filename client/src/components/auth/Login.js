import React, { useState, useEffect } from "react";
import { auth, googleAuthProvider } from "../../firebase";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { LOGGED_IN_USER } from "../../Actions/types";
import { Link } from "react-router-dom";
import { loadingAction } from "../../Actions/loadingAction";
import { GoogleOutlined } from "@ant-design/icons";
import { createOrUpdateUser } from "../../Functions/auth";

const Login = ({ history }) => {
  const [email, setEmail] = useState(""),
    [password, setPassword] = useState(""),
    { user } = useSelector((state) => ({ ...state })),
    dispatch = useDispatch();

  const roleBasedRedirect = (res) => {
    let intend = history.location.state;
    if (intend) {
      history.push(intend.from);
    } else {
      if (res.data.role === "Admin") {
        history.push("/admin/dashboard");
      } else {
        history.push("/");
      }
    }
  };

  const googleLogin = async () => {
    loadingAction(dispatch, true);

    auth
      .signInWithPopup(googleAuthProvider)
      .then(async (res) => {
        loadingAction(dispatch, false);

        const { user } = res;
        await user.getIdTokenResult().then((r) => {
          createOrUpdateUser(r.token)
            .then((res) => {
              dispatch({
                type: LOGGED_IN_USER,
                payload: {
                  name: res.data.name,
                  email: res.data.email,
                  role: res.data.role,
                  token: r.token,
                  _id: res.data._id,
                },
              });
              roleBasedRedirect(res);
            })
            .catch((err) => {
              console.log(err);
            });
        });
      })
      .catch((err) => {
        loadingAction(dispatch, false);
        console.log(err);
        toast.error(err.message);
      });
  };

  // everytime component mounts
  useEffect(() => {
    if (history.location.state) {
      return;
    } else {
      if (user && user.token) {
        history.push("/");
      }
    }
  }, [user, history]);

  const handleSubmit = async (e) => {
    //on form submit

    e.preventDefault();
    loadingAction(dispatch, true);
    try {
      const res = await auth.signInWithEmailAndPassword(email, password),
        { user } = res,
        idTokenRes = await user.getIdTokenResult();

      createOrUpdateUser(idTokenRes.token)
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
          roleBasedRedirect(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
      toast.error(err.message);
      loadingAction(dispatch, false);
    }
  };
  return (
    <div className="container p-5 h-75 d-flex justify-content-center">
      <div className="card" style={{ width: "30rem", height: "50vh" }}>
        <div className="row d-flex card justify-content-center h-100 ">
          <div className="col-12">
            <h4>Login</h4>
          </div>
          <div className="col-12 px-5 pb-3">
            <button
              className="btn btn-danger btn-block"
              onClick={googleLogin}
              style={{ borderRadius: "2rem" }}
            >
              <GoogleOutlined /> Login With Google
            </button>
            <hr />
          </div>
          <div className="col-12 p-0">
            <form onSubmit={handleSubmit} class="login-form w-100">
              <input
                type="email"
                className="form-control my-1"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
              />
              <input
                type="password"
                className="form-control my-1"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
              <Link to="/forgot/password" className="float-end text-secondary">
                Forgot Password?
              </Link>
              <button
                type="submit"
                autoFocus
                className="btn btn-primary btn-block my-1"
              >
                Login with Email/Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
