import axios from "axios";

const baseURl = 'http://localhost:3001/persons'

const getAll = () => {
  const request = axios.get(baseURl)
  return request.then(response => response.data)
}

const create = (personObj) => {
  const request = axios.post(baseURl, personObj)
  return request.then(response => response.data)
}

const update = ({ id, personObj }) => {
  const request = axios.put(`${baseURl}/${id}`, personObj)
  return request.then(response => response.data)
}

const del = (id) => {
  const request = axios.delete(`${baseURl}/${id}`)
  return request.then(response => response.data)
}

export default { getAll, create, update, del }