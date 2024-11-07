import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const res = await axios.get("http://localhost:8800/post");
        setPosts(res.data);
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
    <>
      <h1>Posts</h1>
      <div className="posts">
        {posts.map((post) => (
          <div className="post" key={post.id}>
            <Link className="link" to={`/post/${post.id}`}>
              <h3>{post.title}</h3>
              <span>{post.author}</span>
            </Link>
            <button className="update">
              <Link className="link" to={`/edit/${post.id}`}>Update</Link>
            </button>
            <button className="delete" onClick={() => handleDelete(post.id)}>Delete</button>
          </div>
        ))}
      </div>
      <button className="add">
        <Link className="link" to={'/add'}>Add Post</Link>
      </button>
    </>
  );
};

export default Home;
