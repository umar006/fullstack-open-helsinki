import { useState } from "react";

const Button = ({ text, onClick }) => {
  return <button onClick={onClick}>{text}</button>;
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
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
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={totalFeedback} />
          <StatisticLine text="average" value={avgFeedback} />
          <StatisticLine
            text="positive"
            value={positiveFeedbackInPercentage + " %"}
          />
        </tbody>
      </table>
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
      <Button text="good" onClick={handleIncrementGood} />
      <Button text="neutral" onClick={handleIncrementNeutral} />
      <Button text="bad" onClick={handleIncrementBad} />
      <h2>statistics</h2>
      <Statistics data={data} />
    </div>
  );
};

export default App;
