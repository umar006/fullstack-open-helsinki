import { useEffect } from "react";
import { useState } from "react";
import countryServices from "./services/countryServices";

function App() {
  const [countries, setCountries] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    countryServices.getAll().then((res) => {
      setCountries(res);
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
