import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Add = () => {
  const [post, setPost] = useState({
    title: "",
    author: "",
    content: "",
  })

  const navigate = useNavigate();


  
  const handleChange = (e) => {
    setPost((prev) => ({...prev, [e.target.name]: e.target.value}))
  }

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:8800/post`, post)
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  }
  

  return (
    <div>
      <h1>Add Post</h1>

      <input 
        type="text"
        placeholder="title"
        onChange={handleChange}
        name="title"
      />
      <input 
        type="text"
        placeholder="author"
        onChange={handleChange}
        name="author"
      />
      <input 
        type="text"
        placeholder="content"
        onChange={handleChange}
        name="content"
      />

      <button className="add" onClick={handleClick}>Add</button>
    </div>
  )
}

export default Add