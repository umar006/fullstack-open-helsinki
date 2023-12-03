const Notification = ({ message }) => {
  const style = {
    border: "3px solid black",
    padding: 8,
    margin: "16px 0",
  };

  return message ? <div style={style}>{message}</div> : null;
};

export default Notification;
