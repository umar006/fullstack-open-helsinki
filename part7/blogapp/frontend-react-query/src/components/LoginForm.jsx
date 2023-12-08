import { useEffect, useReducer, useState } from "react";
import notificationReducer from "../reducers/notificationReducer";
import blogServices from "../services/blogServices";
import loginServices from "../services/loginServices";
import Notification from "./Notification";

const LoginForm = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [errMsg, errMsgDispatch] = useReducer(notificationReducer, null);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogServices.setToken(user.token);
    }
  }, [setUser]);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginServices.login({ username, password });

      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      blogServices.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (err) {
      errMsgDispatch({ type: "SET", payload: err.response.data.error });
      setTimeout(() => {
        errMsgDispatch({ type: "SET", payload: null });
      }, 5000);
    }
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <>
      <h1>log in to application</h1>
      <Notification error={errMsg} />
      <form onSubmit={handleLogin}>
        <div>
          username{" "}
          <input
            id="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          password{" "}
          <input
            id="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div>
          <button type="submit" id="btn-login">
            login
          </button>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
