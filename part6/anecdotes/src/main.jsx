import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { legacy_createStore as createStore } from "redux";
import App from "./App";
import anecdoteReducer from "./reducers/anecdoteReducer";

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
