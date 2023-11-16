const PersonForm = ({
  name,
  number,
  onSubmit,
  onChangePerson,
  onChangeNumber,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input value={name} onChange={onChangePerson} />
      </div>
      <div>
        number: <input value={number} onChange={onChangeNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
