import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import Persons from "./components/Person";
import PersonForm from "./components/PersonForm";
import personService from "./services/Person";
import "./index.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [number, setNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState(null);

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

    personService.create(personObj).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));

      setNewName("");
      setNumber("");

      setMessage({
        type: "success",
        text: `Added ${returnedPerson.name}`,
      });

      setTimeout(() => {
        setMessage(null);
      }, 5000);
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

      {message && (
        <div className={message.type === "error" ? "error" : "success"}>
          {message.text}
        </div>
      )}

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

      <Persons
        persons={persons}
        filter={filter}
        deletePerson={deletePerson}
      />
    </div>
  );
};

export default App;