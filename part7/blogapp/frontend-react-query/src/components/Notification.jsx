const SuccessNotification = ({ message }) => {
  return <div className="success">{message}</div>;
};

const ErrorNotification = ({ messages }) => {
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

const Notification = ({ message }) => {
  if (!message || !(message.error || message.success)) return null;

  if (message.error) return <ErrorNotification messages={message.error} />;

  return <SuccessNotification message={message.success} />;
};

export default Notification;
