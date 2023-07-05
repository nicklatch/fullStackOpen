import { useState, useEffect } from 'react';
import axios from 'axios';
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/name';

export const useCountry = (name) => {
  const [country, setCountry] = useState(null);
  const [found, setFound] = useState(true);

  useEffect(() => {
    if (name !== '') {
      axios
        .get(`${baseUrl}/${name}`)
        .then((response) => {
          setCountry(response.data);
          setFound(true);
        })
        .catch((error) => {
          console.log(error);
          setFound(false);
        });
    }
  }, [name]);

  return {
    data: country,
    found,
  };
};

export const useField = (type) => {
  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};
