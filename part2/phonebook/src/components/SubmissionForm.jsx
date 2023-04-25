import personService from "../services/persons";

const SubmissionForm = ({
  newName,
  setNewName,
  newNumber,
  setNewNumber,
  persons,
  setPersons,
}) => {
  const addPerson = (event) => {
    event.preventDefault();

    const duplicatePerson = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );

    const nameObject = {
      name: newName,
      number: newNumber,
    };

    if (duplicatePerson) {
      if (duplicatePerson.number === newNumber) {
        return alert(`${newName} is already present in the phonebook.`);
      } else if (
        confirm(
          `${newName} is already added to the phonebook, would you like to replace the old number with a new one?`
        )
      ) {
        personService
          .update(duplicatePerson.id, { ...duplicatePerson, number: newNumber })
          .then((updatedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== updatedPerson.id ? person : updatedPerson
              )
            );
          });
      }
    } else {
      personService.create(nameObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewNumber("");
      });
    }
  };

  const handlePersonChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={handlePersonChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default SubmissionForm;
