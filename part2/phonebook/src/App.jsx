import { useState, useEffect } from "react";
import personService from "./services/persons";
import SubmissionForm from "./components/SubmissionForm";
import Persons from "./components/Persons";
import FilterSearch from "./components/FilterSearch";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} error={error} />
      <FilterSearch search={search} setSearch={setSearch} persons={persons} />
      <h3>Add a new</h3>
      <SubmissionForm
        persons={persons}
        setPersons={setPersons}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        setMessage={setMessage}
        setError={setError}
      />
      <h3>Numbers</h3>
      <Persons
        persons={persons}
        search={search}
        setPersons={setPersons}
        setMessage={setMessage}
        error={error}
        setError={setError}
      />
    </div>
  );
};

export default App;
