const SuccessNotification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return <div className="success">{message}</div>;
};

const ErrorNotification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return <div className="error">{message}</div>;
};

const Notification = ({ message }) => {
  if (message.error !== null) {
    return <ErrorNotification message={message.error} />;
  }

  return <SuccessNotification message={message.success} />;
};

export default Notification;
