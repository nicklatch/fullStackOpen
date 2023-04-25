import { useState, useEffect } from "react";
import Search from "./components/Search";
import Results from "./components/Results";
import { getInitialData } from "./services/results";

function App() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [countryData, setCountryData] = useState([]);

  useEffect(() => {
    getInitialData().then((initResponse) =>
      setCountryData(initResponse.map((country) => country))
    );
  }, []);

  console.log("blah", countryData);

  return (
    <>
      <Search search={search} setSearch={setSearch} />
      <Results
        search={search}
        results={results}
        setResults={setResults}
        countryData={countryData}
      />
    </>
  );
}

export default App;
