import React, { useState } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { loadingAction } from "../../Actions/loadingAction";
const Password = () => {
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => ({ ...state }));
  const handleSubmit = async (e) => {
    loadingAction(dispatch, true);
    e.preventDefault();
    await auth.currentUser
      .updatePassword(password)
      .then((res) => {
        loadingAction(dispatch, false);
        toast.success("Password Updated");
      })
      .catch((err) => {
        loadingAction(dispatch, false);
        toast.error(err.message);
      });
  };

  return (
    <div className="container p-5 h-75 d-flex justify-content-center">
      <div className="card" style={{ width: "30rem" }}>
        <div className="row d-flex card justify-content-center h-100">
          <div className="col-12 px-5 pb-3">
            <h4>Change Password</h4>
          </div>

          <div className="col-12 p-0">
            <form onSubmit={handleSubmit} className="login-form">
              <input
                type="password"
                className="form-control"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="New Password"
                autoFocus
                required
                disabled={loading}
              />
              <button
                type="submit"
                className="btn btn-primary mt-1 btn-block"
                disabled={!password || loading}
              >
                Change Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Password;
