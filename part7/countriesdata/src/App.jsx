import { useEffect, useState } from "react";
import CountryDetail from "./components/CountryDetail";
import Weather from "./components/Weather";
import countryServices from "./services/countryServices";

function App() {
  const [country, setCountry] = useState(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    countryServices
      .getOne(query)
      .then((res) => {
        setCountry(res);
      })
      .catch(() => setCountry(null));
  }, [query]);

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const countryDetail = !country ? (
    <div>Not found...</div>
  ) : (
    <div>
      <CountryDetail country={country} />
      <Weather country={country} />
    </div>
  );

  return (
    <div>
      country: <input value={query} onChange={handleQueryChange} />
      {countryDetail}
    </div>
  );
}

export default App;
