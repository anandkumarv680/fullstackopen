import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import Persons from "./components/Person";
import PersonForm from "./components/PersonForm";
import personService from "./services/Person";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [number, setNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    personService.getAll().then((persons) => {
      setPersons(persons);
    });
  }, []);

  const userName = (event) => {
    setNewName(event.target.value);
  };

  const addNumber = (event) => {
    setNumber(event.target.value);
  };

  const addUser = (event) => {
    event.preventDefault();

    const personObj = {
      name: newName,
      number: number,
    };

    if (persons.some((p) => p.name === newName)) {
      const person = persons.find((p) => p.name === newName);

      const change = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`,
      );

      if (change) {
        const personObj = {
          name: newName,
          number: number,
        };

        personService
          .update({ id: person.id, personObj })
          .then((updatedPerson) => {
            setPersons(
              persons.map((p) => (p.id === person.id ? updatedPerson : p)),
            );
          });
      }

      setNewName("");
      setNumber("");
      return;
    }

    personService.create(personObj).then((returnedPerson) => {
      setPersons([...persons, returnedPerson]);
      setNewName("");
      setNumber("");
    });
  };

  const deletePerson = (p) => {
    const result = window.confirm(`delete ${p.name} ?`);
    if (result) {
      personService.del(p.id).then(() => {
        setPersons(persons.filter((person) => person.id !== p.id));
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter setFilter={setFilter} />

      <h2>add a new</h2>

      <PersonForm
        userName={userName}
        addNumber={addNumber}
        addUser={addUser}
        number={number}
        newName={newName}
      />

      <h2>Numbers</h2>

      <Persons persons={persons} filter={filter} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
