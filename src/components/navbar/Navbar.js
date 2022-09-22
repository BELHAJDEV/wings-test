import React, { useState, useEffect, useContext } from "react";
import "./navbar.css";
import { useNavigate } from "react-router-dom";
import { useParams, useLocation } from "react-router-dom";
import { Context } from "../../Context";

function Navbar() {
  const navigate = useNavigate();
  const [isHome, setIsHome] = useState(false);
  const [isPosts, setIsPosts] = useState(false);
  const { value1 } = useContext(Context);
  const [state, dispatch] = value1;
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      setIsHome(true);
      setIsPosts(false);
    } else if (location.pathname === "/posts") {
      setIsPosts(true);
      setIsHome(false);
    } else {
      setIsPosts(false);
      setIsHome(false);
    }
  }, [location]);



  return (
    <div className="container">
      <h2>Logo</h2>
      <div className="btns-container">
        <div
          className={!isHome ? "link" : "link on"}
          onClick={() => navigate("/")}
        >
          <span>Home</span>
        </div>
        {state.user ? (
          <>
            <div
              className={!isPosts ? "link" : "link on"}
              onClick={() => navigate("/posts")}
            >
              <span>Posts</span>
            </div>
            <div
              className="btn"
              onClick={() => {
                localStorage.clear();
                dispatch({
                  type: "DELETE_USER",
                });
                navigate("/");
              }}
            >
              <span>Logout</span>
            </div>
          </>
        ) : (
          <div
            className="btn"
            onClick={() => {
              navigate("/login");
            }}
          >
            <span>Login</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
