import { useState } from "react";

const StatisticLine = ({ text, value }) => {
  return (
    <p>
      {text} {value}
    </p>
  );
};

const Statistics = (props) => {
  const {
    good,
    neutral,
    bad,
    totalFeedback,
    avgFeedback,
    positiveFeedbackInPercentage,
  } = props.data;

  if (totalFeedback <= 0) {
    return <p>No feedback given</p>;
  } else {
    return (
      <div>
        <h2>statistics</h2>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={totalFeedback} />
        <StatisticLine text="average" value={avgFeedback} />
        <StatisticLine text="positive" value={positiveFeedbackInPercentage} />
      </div>
    );
  }
};

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
  const positiveFeedbackInPercentage = (good / totalFeedback) * 100 || 0;

  const data = {
    good,
    neutral,
    bad,
    totalFeedback,
    avgFeedback,
    positiveFeedbackInPercentage,
  };

  return (
    <div>
      <h2>give feedback</h2>
      <button onClick={handleIncrementGood}>good</button>
      <button onClick={handleIncrementNeutral}>neutral</button>
      <button onClick={handleIncrementBad}>bad</button>
      <Statistics data={data} />
    </div>
  );
};

export default App;
