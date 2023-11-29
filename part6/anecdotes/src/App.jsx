import { useSelector } from "react-redux";

const Anecdote = ({ anecdote }) => {
  return (
    <div>
      <span>{anecdote.content}</span>
      <div>
        <span>has {anecdote.votes} </span>
        <button>vote</button>
      </div>
    </div>
  );
};

const Anecdotes = ({ anecdotes }) => {
  return (
    <>
      <h1>Anecdotes</h1>
      {anecdotes.map((anecdote) => (
        <Anecdote key={anecdote.id} anecdote={anecdote} />
      ))}
    </>
  );
};

const App = () => {
  const anecdotes = useSelector((state) => state);

  return <Anecdotes anecdotes={anecdotes} />;
};

export default App;
