import { useEffect } from 'react';
import { useField } from '../hooks';

const PersonForm = ({ personService }) => {
  const name = useField('text');
  const number = useField('text');

  const handlePersonSubmit = (event) => {
    event.preventDefault();
    personService.create({ name: name.value, number: number.value });
  };

  useEffect(() => {
    personService.getAll();
  }, []);

  return (
    <form onSubmit={handlePersonSubmit}>
      name <input {...name} /> <br />
      number <input {...number} />
      <button>create</button>
    </form>
  );
};

export default PersonForm;
