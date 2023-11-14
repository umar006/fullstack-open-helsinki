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

  const searchCountries = countries
    .filter((country) => country.name.common.toLowerCase().includes(query))
    .map((country) => <div key={country.ccn3}>{country.name.common}</div>);

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div>
      country: <input value={query} onChange={handleQueryChange} />
      {searchCountries}
    </div>
  );
}

export default App;
