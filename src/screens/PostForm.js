import { useRef, useState, useContext } from "react";
import api from "../api";
import Alert from "../Components/Alert";
import AuthContext from "../context/auth-context";
import { ShowToast } from "../Utilities";

function PostForm(props) {
  const [message, setMessage] = useState("");
  const [postResult, setResult] = useState("");

  const ctx = useContext(AuthContext);

  const handleSubmit = (e) => {
    if (message) {
      api
        .post("/api/posts/create", {}, { message }, ctx.token)
        .then((result) => {
          setResult("Added Post");
          setTimeout(() => {
            setResult("");
          }, 5000);
          setMessage("");
          props.update && props.update();

          setResult(result.data.message);
        })
        .catch((err) => {
          setResult(err.response.data);
          setTimeout(() => {
            setResult("");
          }, 5000);
          setMessage("");
          props.update && props.update();
        });
    } else {
      setResult("Please Enter a Message");
      setTimeout(() => {
        setResult("");
      }, 5000);
    }
  };
  const onChange = (e) => {
    setMessage(e.target.value);
  };
  return (
    <div className="card bg-grey post-form mb-2">
      <label htmlFor="name">
        <strong>Add a new Post </strong>
      </label>
      <input
        type="text-area"
        name="message"
        className="post-form-input"
        value={message}
        placeholder="What's on your mind ?....."
        onChange={onChange}
      ></input>
      <button
        className="btn btn-blue mt-3"
        type="submit"
        onClick={handleSubmit}
      >
        Add Post
      </button>
      {postResult ? <ShowToast message={postResult} /> : null}
    </div>
  );
}

export default PostForm;
