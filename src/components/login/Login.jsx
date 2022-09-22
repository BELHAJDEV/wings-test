import React, { useContext } from "react";
import "./login.css";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Context } from "../../Context";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(6).label("Password"),
});
function Login() {
  const navigate = useNavigate();
  const { value1 } = useContext(Context);
  const [state, dispatch] = value1;

  const Submit = async (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    // console.log("user : ",user)
    dispatch({
      type: "SET_USER",
      payload: user,
    });
    navigate("/");

  };
  return (
    <div className="login-container">
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(value) => Submit(value)}
        validationSchema={validationSchema}
      >
        {({ handleChange, handleSubmit, errors, setFieldTouched, touched }) => (
          <div className="form-container">
            <h2>Login</h2>
            <div className="form-item">
              <label>Email</label>
              <input
                type={"email"}
                placeholder="email@gmail.com"
                onChange={handleChange("email")}
                onBlur={() => setFieldTouched("email")}
                className="input"
              />
              {touched.email && <span className="error">{errors.email}</span>}
            </div>
            <div className="form-item">
              <label>password</label>
              <input
                type={"password"}
                placeholder="password"
                onChange={handleChange("password")}
                onBlur={() => setFieldTouched("password")}
                className="input"
              />
              {touched.password && (
                <span className="error">{errors.password}</span>
              )}
            </div>
            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              className="submit-btn"
            >
              Login
            </button>
          </div>
        )}
      </Formik>
    </div>
  );
}

export default Login;
