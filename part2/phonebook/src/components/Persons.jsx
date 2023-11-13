const Persons = ({ persons, query, deletePerson }) => {
  const filterPhonebooks = persons
    .filter((person) =>
      person.name
        .split(" ")
        .some((name) => name.toLowerCase().startsWith(query)),
    )
    .map((person) => (
      <div key={person.id}>
        {person.name} {person.number + " "}
        <button id={person.id} onClick={deletePerson}>
          delete
        </button>
      </div>
    ));

  return <div>{filterPhonebooks}</div>;
};

export default Persons;
