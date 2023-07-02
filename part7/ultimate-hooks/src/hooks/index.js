import { useState } from 'react';
import axios from 'axios';

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

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);

  const getAll = async (baseUrl) => {
    const response = await axios.get(baseUrl);
    console.log(response);
    setResources(response.data);
  };

  const create = async (baseUrl, newObject) => {
    const response = await axios.post(baseUrl, newObject);
    setResources(resources.concat(response.data));
  };

  const service = {
    create,
    getAll,
  };

  return [resources, service];
};
