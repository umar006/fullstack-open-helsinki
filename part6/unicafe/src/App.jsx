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
    ok,
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
          <StatisticLine text="ok" value={ok} />
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

const App = ({ store }) => {
  const dataStore = store.getState();
  const good = dataStore.good;
  const ok = dataStore.ok;
  const bad = dataStore.bad;

  const handleIncrementGood = () => {
    store.dispatch({ type: "GOOD" });
  };

  const handleIncrementNeutral = () => {
    store.dispatch({ type: "OK" });
  };

  const handleIncrementBad = () => {
    store.dispatch({ type: "BAD" });
  };

  const handleReset = () => {
    store.dispatch({ type: "RESET" });
  };

  const totalFeedback = good + ok + bad;
  const avgFeedback = totalFeedback / 3;
  const positiveFeedbackInPercentage = (good / totalFeedback) * 100 || 0;

  const data = {
    good,
    ok,
    bad,
    totalFeedback,
    avgFeedback,
    positiveFeedbackInPercentage,
  };

  return (
    <div>
      <h2>give feedback</h2>
      <Button text="good" onClick={handleIncrementGood} />
      <Button text="ok" onClick={handleIncrementNeutral} />
      <Button text="bad" onClick={handleIncrementBad} />
      <Button text="reset" onClick={handleReset} />
      <h2>statistics</h2>
      <Statistics data={data} />
    </div>
  );
};

export default App;
