import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { legacy_createStore as createStore } from "redux";
import App from "./App";
import anecdoteReducer from "./reducers/anecdoteReducer";
import { combineReducers } from "redux";
import filterReducer from "./reducers/filterReducer";

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  filter: filterReducer,
});

const store = createStore(reducer);

const root = ReactDOM.createRoot(document.getElementById("root"));

const renderApp = () => {
  root.render(
    <Provider store={store}>
      <App />
    </Provider>,
  );
};

renderApp();
