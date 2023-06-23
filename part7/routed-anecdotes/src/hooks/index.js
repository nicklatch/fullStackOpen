import { useState, useEffect } from 'react';

export const useField = (type) => {
  const defaultValue = '';
  const [value, setValue] = useState(defaultValue);

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const resetter = () => setValue(defaultValue);

  return {
    atributes: {
      type,
      value,
      onChange,
    },
    resetter,
  };
};
