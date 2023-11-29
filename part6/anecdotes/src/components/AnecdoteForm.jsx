import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = (e) => {
    e.preventDefault();

    const anecdote = e.target.anecdote.value;
    e.target.anecdote.value = "";

    dispatch(createAnecdote(anecdote));
  };

  return (
    <form onSubmit={addAnecdote}>
      anecdote <input name="anecdote" /> <button type="submit">add</button>
    </form>
  );
};

export default AnecdoteForm;
