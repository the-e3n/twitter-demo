import moment from "moment";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import AuthContext from "../context/auth-context";

const Post = (props) => {
  let {
    message = "Default Message",
    username = "Username",
    user: postUser = {},
    likes,
    id,
    onChange,
    postedOn,
    liked,
  } = props;
  const ctx = useContext(AuthContext);
  const onLikeChange = (e) => {
    let url = liked ? "/api/posts/dislike" : "/api/posts/like";
    api.get(url, { postid: id }, ctx.token).then((res) => {
      onChange && onChange();
    });
  };

  return (
    <div
      className="card post"
      style={{
        display: "flex",
        wordBreak: "break-word",
        padding: "20px 20px",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <div>
        <img
          className="post-user-img"
          style={{
            borderRadius: "50%",
            marginRight: "20px",
          }}
          src={
            "https://images.pexels.com/photos/5591657/pexels-photo-5591657.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=20&w=20"
          }
          alt="user"
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {postUser._id === ctx.user._id ? (
          <span>You</span>
        ) : (
          <Link to={`/user/${postUser._id}`}>
            <span
              style={{
                fontWeight: "bold",
              }}
            >
              @{postUser.name || "username"}
            </span>
          </Link>
        )}
        <span style={{ fontSize: "10px" }}>{moment(postedOn).fromNow()}</span>
        <div>{message}</div>
        <div style={{ marginTop: "10px" }}>{likes} likes</div>
        <div>
          <div
            className={`btn post-controls btn-blue`}
            onClick={onLikeChange}
            style={{
              transition: "all 0.2s ease-in-out",
              cursor: "pointer",
              marginTop: "10px",
              userSelect: "none",
            }}
          >
            {!liked ? <div>{`👍 Like`}</div> : <div>{`👎 Remove Like`}</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
