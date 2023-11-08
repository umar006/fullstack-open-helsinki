import { useState } from "react";

const App = () => {
  const [good, setGood] = useState(0);

  const handleIncrementGood = () => {
    const newGood = good + 1;
    setGood(newGood);
  };

  return (
    <div>
      <h2>give feedback</h2>
      <button onClick={handleIncrementGood}>good</button>
      <h2>statistics</h2>
      <p>good {good}</p>
    </div>
  );
};

export default App;
