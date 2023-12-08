import { useContext } from "react";
import BlogList from "./components/BlogList";
import LoginForm from "./components/LoginForm";
import LoginContext from "./contexts/LoginContext";

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
    loginDispatch({ type: "LOGOUT" });
  };

  return (
    <>
      <h1>Blogs</h1>
      <h3>
        {login.name} {"logged in "}
        <button onClick={handleLogout}>logout</button>
      </h3>
      <BlogList user={login} />
    </>
  );
}

export default App;
