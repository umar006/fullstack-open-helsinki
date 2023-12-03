import { useNavigate } from "react-router-dom";
import { useField } from "../hooks";
import anecdoteServices from "../services/anecdoteServices";

const AnecdoteForm = ({ anecdotes, setAnecdotes, setNotification }) => {
  const navigate = useNavigate();

  const content = useField("text");
  const author = useField("text");
  const url = useField("text");

  const handleCreateAnecdote = async (e) => {
    e.preventDefault();

    const newAnecdote = await anecdoteServices.create({
      content: content.value,
      author: author.value,
      url: url.value,
      votes: 0,
    });
    setAnecdotes(anecdotes.concat(newAnecdote));
    setNotification(`anecdote '${content.value}' created!`);
    setTimeout(() => setNotification(null), 5000);
    navigate("/");
  };

  const handleResetForm = async () => {
    content.onReset();
    author.onReset();
    url.onReset();
  };

  return (
    <div>
      <h2>Create a new anecdote</h2>
      <form onSubmit={handleCreateAnecdote} onReset={handleResetForm}>
        <div>
          content{" "}
          <input
            type={content.type}
            value={content.value}
            onChange={content.onChange}
          />
        </div>
        <div>
          author{" "}
          <input
            type={author.type}
            value={author.value}
            onChange={author.onChange}
          />
        </div>
        <div>
          url for more info{" "}
          <input type={url.type} value={url.value} onChange={url.onChange} />
        </div>
        <button type="submit">create</button>
        <button type="reset">reset</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
