import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../reducers/loginReducer";
import { setErrorNotification } from "../reducers/notificationReducer";
import blogServices from "../services/blogServices";
import loginServices from "../services/loginServices";
import Notification from "./Notification";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const notification = useSelector((state) => state.notification);
  const dispatch = useDispatch();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);

      dispatch(setUser(user));

      blogServices.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginServices.login({ username, password });

      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      blogServices.setToken(user.token);

      dispatch(setUser(user));

      setUsername("");
      setPassword("");
    } catch (err) {
      dispatch(setErrorNotification(err.response.data.error));
      setTimeout(() => {
        dispatch(setErrorNotification(null));
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
      <Notification notification={notification} />
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
