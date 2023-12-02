import anecdoteServices from "../services/anecdoteServices";

const AnecdoteForm = ({ anecdotes, setAnecdotes }) => {
  const handleCreateAnecdote = async (e) => {
    e.preventDefault();

    const content = e.target.content.value;
    const author = e.target.author.value;
    const url = e.target.url.value;
    e.target.content.value = "";
    e.target.author.value = "";
    e.target.url.value = "";

    const newAnecdote = await anecdoteServices.create({
      content,
      author,
      url,
      votes: 0,
    });
    setAnecdotes(anecdotes.concat(newAnecdote));
  };

  return (
    <div>
      <h2>Create a new anecdote</h2>
      <form onSubmit={handleCreateAnecdote}>
        <div>
          content <input name="content" />
        </div>
        <div>
          author <input name="author" />
        </div>
        <div>
          url for more info <input name="url" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
