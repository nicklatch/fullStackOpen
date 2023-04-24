import { useState, useEffect } from "react";
import personService from "./services/persons";
import SubmissionForm from "./components/SubmissionForm";
import Persons from "./components/Persons";
import FilterSearch from "./components/FilterSearch";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("name");
  const [newNumber, setNewNumber] = useState("number");
  const [search, setSearch] = useState("");

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  console.log(`rendered ${persons.length} records`);

  return (
    <div>
      <h2>Phonebook</h2>
      <FilterSearch search={search} setSearch={setSearch} persons={persons} />
      <h3>Add a new</h3>
      <SubmissionForm
        persons={persons}
        setPersons={setPersons}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} search={search} setPersons={setPersons} />
    </div>
  );
};

export default App;
