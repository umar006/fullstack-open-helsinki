import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";
import { useEffect } from "react";
import personServices from "./services/personServices";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [query, setQuery] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    personServices.getAll().then((persons) => setPersons(persons));
  }, []);

  const addPerson = (e) => {
    e.preventDefault();

    const person = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase(),
    );
    if (person) {
      updatePerson(person);
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
      setSuccessMessage(`Added ${newPerson.name}`);
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    });
  };

  const updatePerson = (person) => {
    personServices
      .update(person.id, { ...person, number: newNumber })
      .then((updatedPerson) => {
        setPersons(
          persons.map((p) => (p.id !== person.id ? p : updatedPerson)),
        );
        setNewName("");
        setNewNumber("");
      })
      .catch(() => {
        setErrorMessage(
          `Information of ${person.name} has already been removed from server`,
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setPersons(persons.filter((p) => p.id !== person.id));
      });
  };

  const deletePerson = (e) => {
    const idToDelete = e.target.id;
    const personToDelete = persons.find((person) => person.id === idToDelete);
    const isDelete = window.confirm(`Delete ${personToDelete.name}?`);
    if (!isDelete) return;

    personServices
      .remove(idToDelete)
      .then(() => {
        setPersons(persons.filter((person) => person.id !== idToDelete));
      })
      .catch(() => {
        setErrorMessage(
          `Information of ${personToDelete.name} has already been removed from server`,
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setPersons(persons.filter((p) => p.id !== personToDelete.id));
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
      <Notification
        message={{ success: successMessage, error: errorMessage }}
      />
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
      <Persons persons={persons} query={query} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
