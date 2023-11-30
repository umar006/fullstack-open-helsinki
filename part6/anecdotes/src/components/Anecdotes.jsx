import { useDispatch, useSelector } from "react-redux";
import { giveAnecdoteVote } from "../reducers/anecdoteReducer";
import {
  removeNotification,
  showNotification,
} from "../reducers/notificationReducer";

const Anecdote = ({ anecdote }) => {
  const dispatch = useDispatch();

  const handleGiveVote = (anecdote) => {
    dispatch(giveAnecdoteVote(anecdote));
    dispatch(showNotification(`you voted '${anecdote.content}'`));
    setTimeout(() => dispatch(removeNotification()), 5000);
  };

  return (
    <div>
      <span>{anecdote.content}</span>
      <div>
        <span>has {anecdote.votes} </span>
        <button onClick={() => handleGiveVote(anecdote)}>vote</button>
      </div>
    </div>
  );
};

const Anecdotes = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    return anecdotes
      .filter((anecdote) => {
        const content = anecdote.content.toLowerCase();
        filter = filter.toLowerCase();
        return content.includes(filter);
      })
      .sort((a, b) => b.votes - a.votes);
  });

  return (
    <>
      {anecdotes.map((anecdote) => (
        <Anecdote key={anecdote.id} anecdote={anecdote} />
      ))}
    </>
  );
};

export default Anecdotes;
