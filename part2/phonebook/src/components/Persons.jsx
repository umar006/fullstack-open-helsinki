const Persons = ({ persons, query }) => {
  const filterPhonebooks = persons
    .filter((person) =>
      person.name
        .split(" ")
        .some((name) => name.toLowerCase().startsWith(query)),
    )
    .map((person) => (
      <div key={person.id}>
        {person.name} {person.number}
      </div>
    ));

  return <div>{filterPhonebooks}</div>;
};

export default Persons;
