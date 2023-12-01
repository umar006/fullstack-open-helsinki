import { useMutation } from "@tanstack/react-query";
import anecdoteServices from "../services/anecdoteServices";

const AnecdoteForm = () => {
  const mutation = useMutation({ mutationFn: anecdoteServices.create });

  const handleAddAnecdote = (e) => {
    e.preventDefault();

    const content = e.target.anecdote.value;
    e.target.anecdote.value = "";
    mutation.mutate(content);
  };

  return (
    <form style={{ marginBottom: 25 }} onSubmit={handleAddAnecdote}>
      content <input name="anecdote" /> <button type="submit">add</button>
    </form>
  );
};

export default AnecdoteForm;
