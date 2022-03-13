import React, { useContext, useState } from "react";
import api from "../api";
import { useHistory } from "react-router";
import Alert from "../Components/Alert";
import { ShowToast } from "../Utilities";
import AuthContext from "../context/auth-context";

const crypto = require("crypto");

const LoginForm = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [result, setResult] = useState("");
  const ctx = useContext(AuthContext);

  const handleSubmit = async (e) => {
    if (!email || !password) {
      setResult("Please Enter Email or Password");
      setTimeout(() => {
        setResult("");
      }, 7000);
    } else if (password.length < 8) {
      setResult("Password must be at least 8 characters long");
      setTimeout(() => {
        setResult("");
      }, 7000);
    } else {
      let data = {};
      let passHash = crypto.createHash("sha256").update(password).digest("hex");
      data["email"] = email;
      data["password"] = passHash;
      setResult("Logging In.........");
      let result = await api.post("/api/users/login", {}, data);

      if (result.data.status === "error") {
        setResult(result.data.message);
        setTimeout(() => {
          setResult("");
        }, 7000);
      } else {
        props.onLogin(result.data.token, result.data.user);
        document.location = "/";
      }
    }
  };
  if (ctx.loggedIn) return null;
  return (
    <div
      className="container login-form p-3 border border-2"
      style={{
        width: "30vw",
        backgroundColor: "white",
        borderRadius: "10px",
        marginTop: "10vh",
      }}
    >
      <h1 className="text-center">Login</h1>
      <div className="mb-2">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          type="text"
          className="form-control"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="mb-2">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="password"
          name="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="d-grid gap-2 mt-4">
        <button
          type="submit"
          className="btn btn-primary btn-block"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>

      {result ? <ShowToast success message={result} /> : null}
    </div>
  );
};

export default LoginForm;
