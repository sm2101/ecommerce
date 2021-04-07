import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { createOrUpdateUser } from "../../Functions/auth";
import { LOGGED_IN_USER } from "../../Actions/types";

const CompleteRegister = ({ history }) => {
  const [email, setEmail] = useState(""),
    [password, setPassword] = useState(""),
    dispatch = useDispatch();
  //   {user} = useSelector((state) => ({...state}))
  useEffect(() => {
    setEmail(window.localStorage.getItem("registerEmail"));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await auth.signInWithEmailLink(email, window.location.href);
      if (res.user.emailVerified) {
        // clear local storage
        window.localStorage.removeItem("registerEmail");
        // get user id token
        let user = auth.currentUser;
        await user.updatePassword(password);
        const idTokenRes = await user.getIdTokenResult();
        createOrUpdateUser(idTokenRes.token)
          .then((res) => {
            dispatch({
              type: LOGGED_IN_USER,
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenRes.token,
                _id: res.data._id,
              },
            });
          })
          .catch((err) => {
            console.log(err);
          });
        history.push("/");
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  return (
    <div className="container p-5 h-75 d-flex justify-content-center">
      <div className="card" style={{ width: "30rem" }}>
        <div className="row d-flex card justify-content-center h-100 w-50">
          <div className="col-12 px-5 pb-3">
            <h4> Complete Registeration</h4>
          </div>

          <div className="col-12 p-0">
            <form onSubmit={handleSubmit} className="login-form">
              <input
                type="email"
                className="form-control my-1"
                name="email"
                value={email}
                placeholder="Email"
              />
              <input
                type="password"
                className="form-control my-1"
                name="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="Password"
                autoFocus
              />
              <button
                type="submit"
                autoFocus
                className="btn btn-primary btn-block mt-1"
              >
                Complete Registration
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CompleteRegister;
