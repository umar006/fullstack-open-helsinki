import { useContext } from "react";
import { Link, Route, Routes } from "react-router-dom";
import Blog from "./components/Blog";
import BlogList from "./components/BlogList";
import LoginForm from "./components/LoginForm";
import UserDetail from "./components/UserDetail";
import UserList from "./components/UserList";
import LoginContext from "./contexts/LoginContext";
import { logoutUser } from "./reducers/loginReducer";

function App() {
  const [login, loginDispatch] = useContext(LoginContext);

  if (!login)
    return (
      <>
        <LoginForm />
      </>
    );

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogAppUser");
    loginDispatch(logoutUser());
  };

  const style = {
    paddingRight: 10,
  };

  return (
    <>
      <nav>
        <Link style={style} to={"/blogs"}>
          blogs
        </Link>
        <Link style={style} to={"/users"}>
          users
        </Link>
      </nav>
      <h1>Blogs</h1>
      <h3>
        {login.name} {"logged in "}
        <button onClick={handleLogout}>logout</button>
      </h3>
      <Routes>
        <Route path="/users" element={<UserList />} />
        <Route path="/users/:id" element={<UserDetail />} />
        <Route path="/blogs" element={<BlogList user={login} />} />
        <Route path="/blogs/:id" element={<Blog user={login} />} />
      </Routes>
    </>
  );
}

export default App;
