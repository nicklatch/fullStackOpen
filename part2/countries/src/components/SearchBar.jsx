/* eslint-disable react/prop-types */
import { Input } from "@mantine/core";
const SearchBar = ({ search, setSearch }) => {
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <Input
      placeholder="Find Countries"
      onChange={handleSearchChange}
      value={search}
      style={{ width: "30vw", marginTop: 10, boxShadow: "0 0 10px 1px rgba(255, 255, 255, 0.1)"}}
    />
  );
};

export default SearchBar;
