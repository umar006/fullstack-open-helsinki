const SuccessNotification = ({ message }) => {
  if (!message) return null;

  return <div className="success">{message}</div>;
};

const ErrorNotification = ({ message }) => {
  if (!message) return null;

  return <div className="error">{message}</div>;
};

const Notification = ({ success, error }) => {
  if (error) return <ErrorNotification message={error} />;

  return <SuccessNotification message={success} />;
};

export default Notification;
