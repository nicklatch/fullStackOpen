const Persons = ({ persons, search }) => {
  const results = persons.filter((person) =>
    person.name.toLowerCase().includes(String(search).toLowerCase())
  );

  return (
    <>
      {results.map((person) => (
        <div key={person.id}>
          {person.name} {person.number}
        </div>
      ))}
    </>
  );
};

export default Persons;
