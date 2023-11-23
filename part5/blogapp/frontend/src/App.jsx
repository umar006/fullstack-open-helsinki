import { useState } from "react";
import LoginForm from "./components/LoginForm";
import BlogList from "./components/BlogList";

function App() {
  const [user, setUser] = useState(null);

  if (!user)
    return (
      <>
        <LoginForm setUser={setUser} />
      </>
    );

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogAppUser");
    setUser(null);
  };

  return (
    <>
      <h1>Blogs</h1>
      <h3>
        {user.name} {"logged in "}
        <button onClick={handleLogout}>logout</button>
      </h3>
      <BlogList user={user} setUser={setUser} />
    </>
  );
}

export default App;
