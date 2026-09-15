import axios from "axios";
const baseUrl = import.meta.env.DEV
  ? "http://localhost:3001/api/persons"
  : "/api/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (personObj) => {
  const request = axios.post(baseUrl, personObj);
  return request.then((response) => response.data);
};

const del = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};

export default { getAll, create, del };