import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");

  const addPerson = (e) => {
    e.preventDefault();

    const personExist = persons.some(
      (person) => person.name.toLowerCase() === newName.toLowerCase(),
    );
    if (personExist) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    const newPerson = { id: persons.length + 1, name: newName };

    setPersons(persons.concat(newPerson));
    setNewName("");
  };

  const handlePersonChange = (e) => {
    setNewName(e.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handlePersonChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <div key={person.id}>{person.name}</div>
      ))}
    </div>
  );
};

export default App;
