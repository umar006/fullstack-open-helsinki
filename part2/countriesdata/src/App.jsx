import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api";

function App() {
  const [countries, setCountries] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    axios.get(baseUrl + "/all").then((res) => {
      setCountries(res.data);
    });
  }, []);

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
