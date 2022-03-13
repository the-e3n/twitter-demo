import React, { useContext, useEffect, useState } from "react";
import Post from "../Components/Post";
import "./Posts.css";
import { useParams } from "react-router-dom";
import api from "../api";
import PostForm from "./PostForm";
import AuthContext from "../context/auth-context";

const User = ({ reloadUser }) => {
  const ctx = useContext(AuthContext);
  const [user, setUser] = useState({});
  let { followers = [] } = user;
  let followed = followers.find(
    (item) => item._id.toString() === ctx.user._id.toString()
  );
  followed = Boolean(followed);
  const params = useParams();
  const loadUser = () => {
    api.get(`/api/users/get/${params.userid}`, {}, ctx.token).then((res) => {
      setUser(res.data);
    });
  };
  useEffect(() => {
    loadUser();
  }, []);
  const onFollowChange = () => {
    let url = `/api/users/${followed ? "unfollow" : "follow"}/${params.userid}`;
    api.post(url, {}, {}, ctx.token).then((res) => {
      loadUser();
      reloadUser && reloadUser();
    });
  };
  let { posts = [] } = user;
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
        postedOn={postedOn}
        onChange={loadUser}
        liked={liked}
      />
    );
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div className="user-profile">
        <img
          className="user-img"
          src={
            "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=200"
          }
          alt="user"
        />
        <h1>{user.name || "Loading User Name..."}</h1>
        <button
          className={`btn ${followed ? "btn-red" : "btn-blue"}`}
          onClick={onFollowChange}
        >
          {followed ? "Unfollow" : "Follow"}
        </button>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {renderPosts.length ? renderPosts : <h1>No Posts Found</h1>}
      </div>
    </div>
  );
};
export default User;
