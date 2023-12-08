import { useReducer } from "react";
import { createContext } from "react";
import loginReducer from "../reducers/loginReducer";

const LoginContext = createContext();

export const LoginContextProvider = (props) => {
  const [login, loginDispatch] = useReducer(loginReducer, null);

  return (
    <LoginContext.Provider value={[login, loginDispatch]}>
      {props.children}
    </LoginContext.Provider>
  );
};

export default LoginContext;
