import React, { useContext } from "react";
import Link from "./Link";
import AuthContext from "../context/auth-context";

const NavBar = (props) => {
  let ctx = useContext(AuthContext);

  return (
    <nav className="navbar-expand navbar bg-dark">
      <div
        className="container-fluid"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          color: "white",
        }}
      >
        <div
          className="nav-links"
          style={{
            display: "flex",
            flexDirection: "row",
            minWidth: "15%",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <Link className="brandLogo" to="/">
            Twitter
          </Link>
          {ctx.loggedIn ? (
            <>
              <Link className="navLink" to="/">
                Home
              </Link>
              <Link className="navLink" to="/following">
                Following
              </Link>
            </>
          ) : null}
        </div>
        <div>
          <div
            className="login-controls"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              minWidth: "20%",
            }}
          >
            {ctx.loggedIn ? (
              <>
                <span>Hello, {ctx.user.name}</span>
                <button
                  className="btn btn-danger mx-2"
                  onClick={props.onLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link style={{ marginRight: "5px" }} to="/register">
                  Register
                </Link>
                <Link style={{ marginLeft: "5px" }} to="/login">
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
