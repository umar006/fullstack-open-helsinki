import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { showNotification } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = async (e) => {
    e.preventDefault();

    const anecdote = e.target.anecdote.value;
    e.target.anecdote.value = "";

    dispatch(createAnecdote(anecdote));
    dispatch(showNotification(`anecdote '${anecdote}' has been added`, 5));
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
