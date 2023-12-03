import { useEffect } from "react";
import { useState } from "react";
import countryServices from "./services/countryServices";
import CountryList from "./components/Country";

function App() {
  const [countries, setCountries] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    countryServices.getAll().then((res) => {
      setCountries(res);
    });
  }, []);

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div>
      country: <input value={query} onChange={handleQueryChange} />
      <CountryList countries={countries} query={query} />
    </div>
  );
}

export default App;
