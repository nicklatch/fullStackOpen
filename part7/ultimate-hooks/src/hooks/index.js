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

export const useResource = (endPoint) => {
  const [resources, setResources] = useState([]);
  const baseUrl = 'http://localhost:3005';

  const getAll = async () => {
    const response = await axios.get(`${baseUrl}/${endPoint}`);
    setResources(response.data);
  };

  const create = async (newObject) => {
    const response = await axios.post(`${baseUrl}/${endPoint}`, newObject);
    setResources(resources.concat(response.data));
  };

  const service = {
    create,
    getAll,
  };

  return [resources, service];
};
