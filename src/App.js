import Posts from "./screens/Posts";
import UserSignUp from "./screens/UserSignUp";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useNavigate,
} from "react-router-dom";
import NavBar from "./Components/NavBar";
import LoginForm from "./screens/LoginForm";
import api from "./api";
import { useState, useEffect } from "react";
import AuthContext from "./context/auth-context";
import User from "./screens/User";

function App() {
  const [logged, setLogged] = useState(false);
  const [user, setUser] = useState({});
  const [token, setToken] = useState("");
  const onLogin = (token, user) => {
    localStorage.setItem("token", token);
    setLogged(true);
    setToken(token);
    setUser(user);
  };

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      api.get("/api/users/validate", {}, token).then((result) => {
        if (result.data.status === "ok") {
          setUser(result.data.user);
          setToken(token);
          setLogged(true);
        }
      });
    }
  }, []);
  const logout = async () => {
    let result = await api.get("/api/users/logout", {}, token);
    if (result.data.status === "ok") {
      localStorage.setItem("token", "");
      setUser({});
      setLogged(false);
      setToken("");
    }
  };
  const reloadUser = () => {
    if (!token) return;
    api.get(`/api/users/get/${user._id}`, {}, token).then((res) => {
      setUser(res.data);
    });
  };

  return (
    <AuthContext.Provider
      value={{
        token: token,
        loggedIn: logged,
        user: user,
      }}
    >
      <Router>
        <NavBar onLogout={logout} />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <RequireLogin loggedIn={logged}>
                <Posts />
              </RequireLogin>
            }
          />
          <Route
            exact
            path="/register"
            element={!logged ? <UserSignUp /> : <Navigate to="/" />}
          ></Route>
          <Route
            exact
            path="/following"
            element={
              !logged ? (
                <LoginForm onLogin={onLogin} />
              ) : (
                <Posts following={true} />
              )
            }
          ></Route>
          <Route exact path="/user">
            <Route
              path=":userid"
              element={
                !logged ? (
                  <LoginForm onLogin={onLogin} />
                ) : (
                  <User reloadUser={reloadUser} />
                )
              }
            />
          </Route>
          <Route
            exact
            path="/login"
            element={
              !logged ? <LoginForm onLogin={onLogin} /> : <Navigate to="/" />
            }
          ></Route>
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

const RequireLogin = ({ loggedIn, children }) => {
  if (loggedIn) {
    return children;
  } else return <Navigate to="/login" />;
};

export default App;
