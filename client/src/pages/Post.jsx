import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


const Post = () => {
  const [post, setPost] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();
  const postId = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const res = await axios.get("http://localhost:8800/post");
        const foundPost = res.data.find((b) => b.id === parseInt(postId));
        setPost(foundPost);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllPosts();
  });

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:8800/post/" + id);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>{post.title}</h1>
      <h5>{post.author}</h5>
      <p>{post.content}</p>
      <button className="update">
        <Link className="link" to={`/edit/${post.id}`}>
          Update
        </Link>
      </button>
      <button className="delete" onClick={() => handleDelete(post.id)}>Delete</button>
      <button>
        <Link className="link" to={'/'}>
          Back Home
        </Link>
      </button>
    </div>
  );
};

export default Post;
