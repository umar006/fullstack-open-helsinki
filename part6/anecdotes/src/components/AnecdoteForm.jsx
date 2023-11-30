import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import {
  removeNotification,
  showNotification,
} from "../reducers/notificationReducer";
import anecdoteServices from "../services/anecdoteServices";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = async (e) => {
    e.preventDefault();

    const anecdote = e.target.anecdote.value;
    e.target.anecdote.value = "";

    const newAnecdote = await anecdoteServices.create(anecdote);
    dispatch(createAnecdote(newAnecdote));
    dispatch(showNotification(`anecdote '${anecdote}' has been added`));
    setTimeout(() => removeNotification(), 5000);
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        anecdote <input name="anecdote" /> <button type="submit">add</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
