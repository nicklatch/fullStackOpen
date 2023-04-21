import {
  personFinder,
  addAndClearInput,
} from "../helpers/SubmissionFormHelper";

const SubmissionForm = ({
  persons,
  setPersons,
  newName,
  setNewName,
  newNumber,
  setNewNumber,
}) => {
  const addPerson = (event) => {
    event.preventDefault();

    const nameObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    personFinder(persons, newName)
      ? alert(`${newName} is already added to the phonebook`)
      : addAndClearInput(
          nameObject,
          persons,
          setPersons,
          setNewName,
          setNewNumber
        );
  };

  const handlePersonChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };
  /*     if (
      persons.find(
        (person) => person["name"].toLowerCase() === newName.toLowerCase()
      )
    ) {
      alert(`${newName} is already added to the phonebook`);
      return;
    }*/

  /*
    setPersons(persons.concat(nameObject));
    setNewName("");
    setNewNumber("");
  };

  const handlePersonChange = (event) => {
    console.log("new name", event.target.value);
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    console.log("new name", event.target.value);
    setNewNumber(event.target.value);
  };
 */
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
