import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.jsx";
import { LoginContextProvider } from "./contexts/LoginContext.jsx";
import { NotificationContextProvider } from "./contexts/NotificationContext.jsx";
import "./index.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <Router>
      <LoginContextProvider>
        <NotificationContextProvider>
          <App />
        </NotificationContextProvider>
      </LoginContextProvider>
    </Router>
  </QueryClientProvider>,
);
