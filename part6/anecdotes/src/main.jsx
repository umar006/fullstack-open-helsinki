import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { legacy_createStore as createStore } from "redux";
import anecdoteReducer from "./reducer.js";
import { Provider } from "react-redux";

const store = createStore(anecdoteReducer);

const root = ReactDOM.createRoot(document.getElementById("root"));

const renderApp = () => {
  root.render(
    <Provider store={store}>
      <App />
    </Provider>,
  );
};

renderApp();
