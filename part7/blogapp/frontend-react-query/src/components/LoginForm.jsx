import { useContext, useEffect, useState } from "react";
import NotificationContext from "../contexts/NotificationContext";
import blogServices from "../services/blogServices";
import loginServices from "../services/loginServices";
import Notification from "./Notification";
import LoginContext from "../contexts/LoginContext";
import { errorMessage } from "../reducers/notificationReducer";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [_, loginDispatch] = useContext(LoginContext);
  const [notif, notifDispatch] = useContext(NotificationContext);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      loginDispatch({ type: "LOGIN", payload: user });
      blogServices.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginServices.login({ username, password });

      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      blogServices.setToken(user.token);
      loginDispatch({ type: "LOGIN", payload: user });

      setUsername("");
      setPassword("");
    } catch (err) {
      notifDispatch(errorMessage(err.response.data.error));
      setTimeout(() => {
        notifDispatch({ type: "SET", payload: null });
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
      <Notification message={notif} />
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
