import { useContext, useEffect, useState } from "react";
import NotificationContext from "../contexts/NotificationContext";
import blogServices from "../services/blogServices";
import loginServices from "../services/loginServices";
import Notification from "./Notification";
import LoginContext from "../contexts/LoginContext";
import { errorMessage, nullMessage } from "../reducers/notificationReducer";
import { loginUser } from "../reducers/loginReducer";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [_, loginDispatch] = useContext(LoginContext);
  const [notif, notifDispatch] = useContext(NotificationContext);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      loginDispatch(loginUser(user));
      blogServices.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginServices.login({ username, password });

      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      blogServices.setToken(user.token);
      loginDispatch(loginUser(user));

      setUsername("");
      setPassword("");
    } catch (err) {
      notifDispatch(errorMessage(err.response.data.error));
      setTimeout(() => {
        notifDispatch(nullMessage());
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
    <div className="px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">log in to application</h1>
      <Notification message={notif} />
      <form onSubmit={handleLogin}>
        <div>
          username{" "}
          <input
            id="username"
            value={username}
            onChange={handleUsernameChange}
            required
            className="mt-1 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500
    "
          />
        </div>
        <div>
          password{" "}
          <input
            id="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
            className="mt-1 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500
    "
          />
        </div>
        <div>
          <button
            type="submit"
            id="btn-login"
            className="px-4 py-2 bg-sky-500 mt-8 text-slate-100 font-medium"
          >
            login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
