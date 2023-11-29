import { useDispatch, useSelector } from "react-redux";
import { giveAnecdoteVote } from "../reducers/anecdoteReducer";

const Anecdote = ({ anecdote }) => {
  const dispatch = useDispatch();

  const handleGiveVote = (anecdoteId) => {
    dispatch(giveAnecdoteVote(anecdoteId));
  };

  return (
    <div>
      <span>{anecdote.content}</span>
      <div>
        <span>has {anecdote.votes} </span>
        <button onClick={() => handleGiveVote(anecdote.id)}>vote</button>
      </div>
    </div>
  );
};

const Anecdotes = () => {
  const anecdotes = useSelector((state) =>
    state.sort((a, b) => b.votes - a.votes),
  );

  return (
    <>
      {anecdotes.map((anecdote) => (
        <Anecdote key={anecdote.id} anecdote={anecdote} />
      ))}
    </>
  );
};

export default Anecdotes;
