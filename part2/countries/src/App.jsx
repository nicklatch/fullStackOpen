import { useState } from "react";
import Search from "./components/Search";
import Results from "./components/Results";

function App() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState(null);
  
  return (
    <>
      <Search search={search} setSearch={setSearch} />
      <Results results={results} setResults={setResults} />
    </>
  );
}

export default App;
