import axios from 'axios';
const baseUrl = 'http://localhost:3001/anecdotes';

export const getAll = () => {
  const response = axios.get(baseUrl).then((res) => res.data);
  return response;
};

export const getAnecdote = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};
