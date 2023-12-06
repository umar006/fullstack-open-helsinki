const SuccessNotification = ({ message }) => {
  if (!message) return null;

  return <div className="success">{message}</div>;
};

const ErrorNotification = ({ messages }) => {
  if (!messages) return null;

  if (Array.isArray(messages)) {
    return (
      <div className="error">
        {messages.map((message, idx) => (
          <p key={idx}>{message}</p>
        ))}
      </div>
    );
  }

  return <div className="error">{messages}</div>;
};

const Notification = ({ notification }) => {
  if (notification.error)
    return <ErrorNotification messages={notification.message} />;

  return <SuccessNotification message={notification.message} />;
};

export default Notification;
