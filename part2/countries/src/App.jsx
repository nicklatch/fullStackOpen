import { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./components/Search";
import Content from "./components/Content";

function App() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [countryData, setCountryData] = useState([]);

  useEffect(() => {
    async function getInitialData() {
      const request = await axios.get("https://restcountries.com/v3.1/all");
      setCountryData(request.data);
    }
    getInitialData();
  }, []);

  useEffect(() => {
    setResults(
      countryData.filter((country) =>
        country.name.common.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search]);

  return (
    <>
      <SearchBar search={search} setSearch={setSearch} />
      <Content search={search} setSearch={setSearch} results={results} />
    </>
  );
}

export default App;
