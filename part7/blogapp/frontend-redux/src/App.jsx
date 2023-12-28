import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import { setUser } from "./reducers/loginReducer";

function App() {
  const user = useSelector((state) => state.login);
  const dispatch = useDispatch();

  if (!user)
    return (
      <>
        <LoginForm />
      </>
    );

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogAppUser");
    dispatch(setUser(null));
  };

  return (
    <>
      <h1>Blogs</h1>
      <h3>
        {user.name} {"logged in "}
        <button onClick={handleLogout}>logout</button>
      </h3>
      <Outlet />
    </>
  );
}

export default App;
