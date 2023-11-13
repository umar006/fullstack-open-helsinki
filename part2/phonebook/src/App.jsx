import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import { useEffect } from "react";
import axios from "axios";
import personServices from "./services/personServices";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    personServices.getAll().then((persons) => setPersons(persons));
  }, []);

  const addPerson = (e) => {
    e.preventDefault();

    const personExist = persons.some(
      (person) => person.name.toLowerCase() === newName.toLowerCase(),
    );
    if (personExist) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    const newPerson = {
      id: persons.length + 1,
      name: newName,
      number: newNumber,
    };

    personServices.create(newPerson).then((person) => {
      setPersons(persons.concat(person));
      setNewName("");
      setNewNumber("");
    });
  };

  const handlePersonChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handleFilterChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter query={query} onChange={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm
        name={newName}
        number={newNumber}
        onSubmit={addPerson}
        onChangePerson={handlePersonChange}
        onChangeNumber={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} query={query} />
    </div>
  );
};

export default App;
