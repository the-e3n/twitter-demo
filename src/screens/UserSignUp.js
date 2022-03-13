import React, { useState } from "react";
import api from "../api";
import crypto from "crypto";
import { ShowToast } from "../Utilities";

const UserSignUp = (props) => {
  const [result, setResult] = useState("");
  const [state, setState] = useState({});

  const handleSubmit = async (e) => {
    let pass1 = state["password1"];
    let pass2 = state["password2"];

    if (pass1.length < 8 && !(pass1 === pass2)) {
      setResult("Passwords must be equal and at least 8 characters long");
    } else {
      let pass1Hash = crypto.createHash("sha256").update(pass1).digest("hex");
      let pass2Hash = crypto.createHash("sha256").update(pass2).digest("hex");
      state["password1"] = pass1Hash;
      state["password2"] = pass2Hash;
      setResult("Signing Up.....Please wait!");
      let result = await api.post("/api/users/register", {}, { ...state });

      if (result.data.status === "ok") {
        setResult("Sign Up Successfull, Redirecting...");
        setTimeout(() => {
          setResult("");
          document.location = "/";
        }, 3000);
      } else {
        setResult(result.data.message);
        setTimeout(() => {
          setResult("");
        }, 7000);
      }
    }
  };
  return (
    <div
      className="container p-5 signup-form"
      style={{ width: "30vw", marginTop: "10vh", backgroundColor: "white" }}
    >
      <h1 className="text-center">Sign Up</h1>
      {result ? <ShowToast message={result} duration={5000} /> : null}
      <div className="mb-2">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          onChange={(e) =>
            setState((prev) => ({ ...prev, name: e.target.value }))
          }
        />
      </div>

      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email address
        </label>
        <input
          type="email"
          name="email"
          className="form-control"
          id="email"
          aria-describedby="emailHelp"
          onChange={(e) =>
            setState((prev) => ({ ...prev, email: e.target.value }))
          }
        />
        <div id="emailHelp" className="form-text">
          We'll never share your email with anyone else.
        </div>
      </div>
      <div className="mb-2">
        <label htmlFor="dob" className="form-label">
          Date Of Birth
        </label>
        <input
          type="date"
          className="form-control"
          id="dob"
          name="dob"
          onChange={(e) =>
            setState((prev) => ({ ...prev, dob: e.target.value }))
          }
        />
      </div>
      <div className="mb-2">
        <label htmlFor="password1" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="password1"
          name="password1"
          onChange={(e) =>
            setState((prev) => ({ ...prev, password1: e.target.value }))
          }
        />
      </div>
      <div className="mb-2">
        <label htmlFor="password2" className="form-label">
          Confirm Password
        </label>
        <input
          type="password"
          className="form-control"
          id="password2"
          name="password2"
          onChange={(e) =>
            setState((prev) => ({ ...prev, password2: e.target.value }))
          }
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
    </div>
  );
};

export default UserSignUp;
