import { useState } from "react";
import CountryDetail from "./components/CountryDetail";
import Weather from "./components/Weather";
import { useCountry } from "./hooks";

function App() {
  const [query, setQuery] = useState("");
  const country = useCountry(query).value;

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
