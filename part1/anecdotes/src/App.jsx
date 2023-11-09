import { useState } from "react";

const MostVoteAnecdote = ({ anecdotes, vote, selected }) => {
  return (
    <>
      <h2>Anecdote with most votes</h2>
      <div>{anecdotes[selected]}</div>
      <p>has {vote[selected]} votes</p>
    </>
  );
};

const AnecdoteOfTheDay = ({ anecdotes, vote, selected }) => {
  return (
    <>
      <h2>Anecdote of the day</h2>
      <div>{anecdotes[selected]}</div>
      <p>has {vote[selected]} votes</p>
    </>
  );
};

const Anecdote = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];
  const anecdoteVotes = new Array(anecdotes.length).fill(0);

  const [vote, setVote] = useState(anecdoteVotes);
  const [selected, setSelected] = useState(0);

  const handleVote = () => {
    const newVote = [...vote];
    newVote[selected] += 1;
    setVote(newVote);
  };

  const randomAnecdote = () => {
    const randomInt = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomInt);
  };

  const mostVoteAnecdote = vote.indexOf(Math.max(...vote));
  return (
    <>
      <AnecdoteOfTheDay anecdotes={anecdotes} vote={vote} selected={selected} />
      <button onClick={handleVote}>vote</button>
      <button onClick={randomAnecdote}>next anecdote</button>
      <MostVoteAnecdote
        anecdotes={anecdotes}
        vote={vote}
        selected={mostVoteAnecdote}
      />
    </>
  );
};

const App = () => {
  return (
    <div>
      <Anecdote />
    </div>
  );
};

export default App;
