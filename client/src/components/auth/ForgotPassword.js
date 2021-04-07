import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { loadingAction } from "../../Actions/loadingAction";
const ForgotPassword = ({ history }) => {
  const [email, setEmail] = useState(""),
    { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  useEffect(() => {
    if (user && user.token) {
      history.push("/");
    }
  }, [user, history]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    loadingAction(dispatch, true);
    const config = {
      url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
      handleCdeInApp: true,
    };
    await auth
      .sendPasswordResetEmail(email, config)
      .then(() => {
        loadingAction(dispatch, false);
        toast.success(
          `Email has been sent to ${email}.Click it to reset your password`
        );
        setEmail("");
      })
      .catch((err) => {
        loadingAction(dispatch, false);
        toast.error(err.message);
      });
  };

  return (
    <div className="container p-5 h-100 d-flex justify-content-center align-items-center">
      <div className="card" style={{ width: "30rem", height: "50vh" }}>
        <div className="row d-flex card justify-content-center h-100">
          <div className="col-12 px-5 pb-3">
            <h4>Reset Password</h4>
          </div>

          <div className="col-12 p-0">
            <form onSubmit={handleSubmit} className="login-form w-100">
              <input
                type="email"
                className="form-control"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                autoFocus
              />
              <button type="submit" className="btn btn-primary mt-1 btn-block">
                Reset Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
