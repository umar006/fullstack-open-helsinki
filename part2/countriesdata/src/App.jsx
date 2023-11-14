import { useState } from "react";

function App() {
  const [query, setQuery] = useState("");

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div>
      country: <input value={query} onChange={handleQueryChange} />
    </div>
  );
}

export default App;
