import axios from "axios";

const baseURl = 'http://localhost:3001/persons'

const getAll = () =>{
    const request = axios.get(baseURl)
    return request.then(response => response.data).catch(error => {
    console.log('fail')
  })
}

const create = (personObj) =>{
    const request = axios.post(baseURl,personObj)
    return request.then(response => response.data).catch(error => {
    console.log('fail')
  })
}

const update = ({id, personObj}) =>{
    const request = axios.put(`${baseURl}/${id}`, personObj)
    return request.then(response => response.data).catch(error => {
    console.log('fail')
  })
}

const del = (id) =>{
    const request = axios.delete(`${baseURl}/${id}`)
    return request.then(response => response.data).catch(error => {
    console.log('fail')
  })
}

export default { getAll, create, update, del}