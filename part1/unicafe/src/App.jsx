import { useState } from "react";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleIncrementGood = () => {
    const newGood = good + 1;
    setGood(newGood);
  };

  const handleIncrementNeutral = () => {
    const newNeutral = neutral + 1;
    setNeutral(newNeutral);
  };

  const handleIncrementBad = () => {
    const newBad = bad + 1;
    setBad(newBad);
  };

  const totalFeedback = good + neutral + bad;
  const avgFeedback = totalFeedback / 3;

  return (
    <div>
      <h2>give feedback</h2>
      <button onClick={handleIncrementGood}>good</button>
      <button onClick={handleIncrementNeutral}>neutral</button>
      <button onClick={handleIncrementBad}>bad</button>
      <h2>statistics</h2>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {totalFeedback}</p>
      <p>average {avgFeedback}</p>
    </div>
  );
};

export default App;
