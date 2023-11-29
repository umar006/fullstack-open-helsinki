/* eslint-disable react/prop-types */
import "./App.css";

function App({ store }) {
  return (
    <>
      <h1>Counter App</h1>
      <div className="card">
        <h2>{store.getState()}</h2>
        <button onClick={() => store.dispatch({ type: "DECREMENT" })}>-</button>
        <button onClick={() => store.dispatch({ type: "ZERO" })}>zero</button>
        <button onClick={() => store.dispatch({ type: "INCREMENT" })}>+</button>
      </div>
    </>
  );
}

export default App;
