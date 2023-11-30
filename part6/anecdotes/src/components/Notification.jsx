import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };

  const notify = !notification ? null : <div style={style}>{notification}</div>;

  return notify;
};

export default Notification;
