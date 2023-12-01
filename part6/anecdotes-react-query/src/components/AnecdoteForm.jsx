const AnecdoteForm = () => {
  const handleAddAnecdote = (e) => {
    e.preventDefault();

    const content = e.target.anecdote.value;
    e.target.anecdote.value = "";
    console.log("Add new anecdote...", content);
  };

  return (
    <form style={{ marginBottom: 25 }} onSubmit={handleAddAnecdote}>
      content <input name="anecdote" /> <button type="submit">add</button>
    </form>
  );
};

export default AnecdoteForm;
