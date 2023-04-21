export const FilterSearch = ({ search, setSearch, persons }) => {
  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  console.log("search", search);

  const splitNames = persons.map((person) =>
    person.name.toLowerCase().split("")
  );

  const matches = (letter) => letter === search;

  console.log(splitNames.map((name) => name.some(matches)));

  return (
    <div>
      filter shown with: <input value={search} onChange={handleSearch} />
    </div>
  );
};
