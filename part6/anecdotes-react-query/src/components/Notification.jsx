const Notification = () => {
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 25,
  };

  const notification = null;

  const notify = !notification ? null : <div style={style}>{notification}</div>;

  return notify;
};

export default Notification;
