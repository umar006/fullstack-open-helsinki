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

  return (
    <div className="m-4">
      <nav className="flex my-4 items-center">
        <Link className="mx-2 font-medium text-blue-500" to={"blogs"}>
          blogs
        </Link>
        <Link className="mx-2 font-medium text-blue-500" to={"users"}>
          users
        </Link>
        <div className="">
          <h3 className="text-lg font-semibold">
            {login.name} {"logged in "}
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-slate-100 font-medium"
            >
              logout
            </button>
          </h3>
        </div>
      </nav>
      <h1 className="text-4xl font-bold my-8">Blogs</h1>
      <Routes>
        <Route path="users">
          <Route index element={<UserList />} />
          <Route path=":id" element={<UserDetail />} />
        </Route>
        <Route path="blogs">
          <Route index element={<BlogList user={login} />} />
          <Route path=":id" element={<Blog user={login} />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
