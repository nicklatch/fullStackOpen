import axios from "axios";
const baseUrl = "http://restcountries.com/v3.1/all";

export const getSearchResults = (search, setter) => {
  return axios
    .get(`${baseUrl}/${search}`)
    .then((response) => setter(response.data));
};
