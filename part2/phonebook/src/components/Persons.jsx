import peopleService from "../services/persons";

const Persons = ({ persons, search, setPersons, setError }) => {
  const results = persons.filter((person) => {
    return person.name.toLowerCase().includes(String(search).toLowerCase());
  });

  const handleDelete = (event) => {
    const name = event.target.value;
    const id = persons.find((person) => person.name === name).id;

    if (confirm(`Delete ${name}?`) && true)
      peopleService
        .personDelete(id)
        .then(() =>
          peopleService
            .getAll()
            .then((personsRemaing) => setPersons(personsRemaing))
        )
        .catch((error) => {
          console.log(error);
          setError(
            `Information of ${name} has been already been removed from the server`
          );
          setTimeout(() => {
            setError("");
          }, 5000);
        });
  };

  return (
    <>
      {results.map((person) => (
        <div key={person.id}>
          {person.name} {person.number}{" "}
          <button onClick={handleDelete} value={person.name}>
            Delete
          </button>
        </div>
      ))}
    </>
  );
};

export default Persons;
