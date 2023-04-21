export const personFinder = (persons, newName) => {

  return persons.find(
    (person) => person["name"].toLowerCase() === newName.toLowerCase()
  );
};

export const addAndClearInput = (
  nameObject,
  persons,
  setPersons,
  setNewName,
  setNewNumber
) => {
  setPersons(persons.concat(nameObject));
  setNewName("");
  setNewNumber("");
};
