import React, { useState, useEffect } from "react";
import axios from "axios";
import "./posts.css";
import Card from "../card/Card";
import { useLocation, useNavigate } from "react-router-dom";
import HashLoader from "react-spinners/HashLoader";

function Posts() {
  const [posts, setPosts] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const getPosts = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
      setPosts(res.data);
      if (res.data) setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/login");
    }
  }, [location]);

  useEffect(() => {
    getPosts();
  }, []);

  if (loading) {
    return (
      <div className="posts-container loading">
        <HashLoader color="#36d7b7" />
      </div>
    );
  }
  return (
    <div className="posts-container">
      {posts.map((post, index) => (
        <Card post={post} key={index} />
      ))}
    </div>
  );
}

export default Posts;
