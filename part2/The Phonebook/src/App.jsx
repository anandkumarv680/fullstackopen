import { useState, useEffect } from 'react'
import axios from "axios";
import Filter from './components/Filter'
import Persons from './components/Person'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then(response => {
        setPersons(response.data);
      });
  }, []);
  const [newName, setNewName] = useState('')
  const [number, setNumber] = useState('')
  const [filter, setFilter] = useState('')
  const userName = (event) => {
    event.preventDefault();
    setNewName(event.target.value)
  }

  const addNumber = (event) => {
    event.preventDefault();
    setNumber(event.target.value)
  }


  const addUser = (event) => {
    event.preventDefault();
    if (persons.some(p => p.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      setNumber('')
      return
    }
    setPersons([...persons, { name: newName, number: number }])
    setNewName('')
    setNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter setFilter={setFilter}></Filter>
      <h2>add a new</h2>
      <PersonForm userName={userName} addNumber={addNumber} addUser={addUser} number={number} newName={newName} ></PersonForm>
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter}></Persons>
    </div>
  )
}

export default App