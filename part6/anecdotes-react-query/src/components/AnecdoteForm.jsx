import { useMutation, useQueryClient } from "@tanstack/react-query";
import anecdoteServices from "../services/anecdoteServices";

const AnecdoteForm = ({ notificationDispatch }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: anecdoteServices.create,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });

      notificationDispatch({
        type: "SET",
        payload: `anecdote '${data.content}' created`,
      });
      setTimeout(() => {
        notificationDispatch({ type: "SET", payload: null });
      }, 5000);
    },
  });

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
