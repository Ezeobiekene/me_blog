import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


const Edit = () => {
  const [post, setPost] = useState({
    title: "",
    author: "",
    content: "",
  })

  const navigate = useNavigate();
  const location = useLocation();
  const postId = location.pathname.split('/')[2];


  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const res = await axios.get("http://localhost:8800/post");
        const foundPost = res.data.find((b) => b.id === parseInt(postId))
        setPost(foundPost);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllPosts();
  }, [postId]);

  const handleChange = (e) => {
    setPost((prev) => ({...prev, [e.target.name]: e.target.value}))
  }

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8800/post/${postId}`, post)
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  }
  

  return (
    <div>
      <h1>Edit Post</h1>

      <input 
        type="text"
        placeholder="title"
        onChange={handleChange}
        name="title"
        className="input"
        value={post.title}
      />
      <input 
        type="text"
        placeholder="author"
        onChange={handleChange}
        name="author"
        className="input"
        value={post.author}
      />
      <input 
        type="text"
        placeholder="content"
        onChange={handleChange}
        name="content"
        className="input last-input"
        value={post.content}
      />

      <button className="update" onClick={handleClick}>Update</button>
    </div>
  )
}

export default Edit