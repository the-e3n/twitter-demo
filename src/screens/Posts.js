import React, { useContext, useEffect, useState } from "react";
import Post from "../Components/Post";
import "./Posts.css";
import api from "../api";
import PostForm from "./PostForm";
import AuthContext from "../context/auth-context";
import { Link } from "react-router-dom";

const Posts = (props) => {
  let following = document.location.pathname.includes("following");

  const ctx = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  let url = following ? "/api/posts/following" : "/api/posts";
  useEffect(() => {
    api.get(url, {}, ctx.token).then((res) => {
      setPosts(res.data);
    });
  }, [ctx]);
  const reloadPosts = () => {
    api.get(url, {}, ctx.token).then((res) => {
      setPosts(res.data);
    });
  };
  let renderPosts = posts.map((post) => {
    let {
      message,
      user,
      email,
      likes,
      id,
      likeCount = 0,
      _id,
      postedOn,
    } = post;
    let liked = likes.find((user) => ctx.user._id === user._id);
    return (
      <Post
        message={message}
        username={user.name}
        user={user}
        likes={likeCount}
        key={_id}
        id={_id}
        onChange={reloadPosts}
        postedOn={postedOn}
        liked={liked}
      />
    );
  });
  return (
    <div className="posts-container">
      <div className="posts">
        <PostForm update={reloadPosts}></PostForm>
        {renderPosts.length ? renderPosts : <h1>No Posts Found</h1>}
      </div>
      {following ? (
        <div className="following-users">
          <h1>People You Follow</h1>
          {ctx.user.following.map((user) => {
            if (!user.name) return null;
            return (
              <Link to={`/user/${user._id}`}>
                <span
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  {user.name || "username"}
                </span>
              </Link>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};
export default Posts;
