const Notification = ({ message }) => {
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 25,
  };

  const notify = !message ? null : <div style={style}>{message}</div>;

  return notify;
};

export default Notification;
