import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [query, setQuery] = useState("");

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

    setPersons(persons.concat(newPerson));
    setNewName("");
    setNewNumber("");
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
