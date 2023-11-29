import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { legacy_createStore as createStore } from "redux";
import anecdoteReducer from "./reducer.js";
import { Provider } from "react-redux";

const store = createStore(anecdoteReducer);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
