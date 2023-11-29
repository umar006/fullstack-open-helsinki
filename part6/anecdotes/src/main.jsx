import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { legacy_createStore as createStore } from "redux";
import anecdoteReducer from "./reducer.js";

const store = createStore(anecdoteReducer);

const root = ReactDOM.createRoot(document.getElementById("root"));

const renderApp = () => {
  root.render(<App store={store} />);
};

renderApp();
store.subscribe(renderApp);
