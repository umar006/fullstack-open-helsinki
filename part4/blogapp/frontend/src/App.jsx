import { useState } from "react";
import LoginForm from "./components/LoginForm";

function App() {
  const [user, setUser] = useState(null);

  if (!user)
    return (
      <>
        <LoginForm setUser={setUser} />
      </>
    );

  return <h1>{user.name} logged in</h1>;
}

export default App;
