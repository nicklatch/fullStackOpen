import { useState } from 'react';
import { useField } from '../hooks';

const SearchForm = ({ setName }) => {
  const nameInput = useField('text');
 

  const fetch = (e) => {
    e.preventDefault();
    setName(nameInput.value);
  };

  return (
    <form onSubmit={fetch}>
      <input {...nameInput} />
      <button>find</button>
    </form>
  );
};

export default SearchForm;
