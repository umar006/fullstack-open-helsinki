import { useState } from "react";
import LoginForm from "./components/LoginForm";

function App() {
  const [user, setUser] = useState(null);

  return (
    <>
      <LoginForm setUser={setUser} />
    </>
  );
}

export default App;
