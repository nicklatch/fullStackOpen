import peopleService from "../services/persons";

const Persons = ({ persons, search, setPersons }) => {
  const results = persons.filter((person) => {
    return person.name.toLowerCase().includes(String(search).toLowerCase());
  });

  const handleDelete = (event) => {
    const name = event.target.value;
    const id = persons.find((person) => person.name === name).id;

    confirm(`Delete ${name}?`)
      ? peopleService
          .personDelete(id)
          .then(() =>
            peopleService
              .getAll()
              .then((personsRemaing) => setPersons(personsRemaing))
          )
      : alert("no deletes made");
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
