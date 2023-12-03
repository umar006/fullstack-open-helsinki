const AnecdoteDetail = ({ anecdote }) => {
  if (!anecdote)
    return (
      <div>
        <h2>Not found</h2>
      </div>
    );

  return (
    <div>
      <h2>{anecdote.content}</h2>
      <p>has {anecdote.votes} votes</p>
      <p>
        for more info see <a href={anecdote.url}>{anecdote.url}</a>
      </p>
    </div>
  );
};

export default AnecdoteDetail;
