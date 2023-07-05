import PersonForm from './PersonForm';
import { useResource } from '../hooks';

const Persons = () => {
  const [persons, personService] = useResource('persons');

  return (
    <>
      <h2>persons</h2>
      <PersonForm personService={personService} />
      {persons.map((n) => (
        <p key={n.id}>
          {n.name} {n.number}
        </p>
      ))}
    </>
  );
};

export default Persons;
