/* eslint-disable react/prop-types */
const SearchBar = ({ search, setSearch }) => {
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div>
      Find Countries: <input value={search} onChange={handleSearchChange} />
    </div>
  );
};

export default SearchBar;
