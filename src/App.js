import "./App.css";
import Navbar from "./components/navbar/Navbar";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import { Fragment, useEffect, useReducer } from "react";
import Posts from "./components/posts/Posts";
import { Context } from "./Context";
import { initialeState, reducer } from "./Reducer";

function App() {
  const [state, dispatch] = useReducer(reducer, initialeState);

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));
    dispatch({
      type: "SET_USER",
      payload: user,
    });
  }, []);
  return (
    <div className="App">
      <Context.Provider
        value={{
          value1: [state, dispatch],
        }}
      >
        <Router>
          <Fragment>
            <Navbar />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Home />} />
              <Route path="/posts" element={<Posts />} />
            </Routes>
          </Fragment>
        </Router>
      </Context.Provider>
    </div>
  );
}

export default App;
