import { useState, useEffect } from "react";
import Search from "./components/Search";
import Results from "./components/Results";

function App() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState(null);

  useEffect(() => {
    if (results) {
      console.log("effect run, search is current");
    }
  }, [results]);

  return (
    <>
      <Search search={search} setSearch={setSearch} />
      <Results search={search} results={results} setResults={setResults} />
    </>
  );
}

export default App;
