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
        wordBreak: "break-all",
        padding: "20px 20px",
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
            @{postUser.name}
          </span>
        </Link>
      )}
      <span style={{ fontSize: "10px" }}>{moment(postedOn).fromNow()}</span>
      <div>{message}</div>
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
          {!liked ? (
            <div>{`👍 ${likes} likes`}</div>
          ) : (
            <div>{`👎 ${likes} likes`}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
