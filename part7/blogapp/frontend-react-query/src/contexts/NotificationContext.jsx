import { useReducer } from "react";
import { createContext } from "react";
import notificationReducer from "../reducers/notificationReducer";

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [notif, notifDispatch] = useReducer(notificationReducer, null);

  return (
    <NotificationContext.Provider value={[notif, notifDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
