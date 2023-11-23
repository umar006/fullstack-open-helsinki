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

  return <BlogList user={user} setUser={setUser} />;
}

export default App;
