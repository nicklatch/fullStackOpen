const Notification = ({ message, error }) => {
  if (message && !error) {
    return <div className="notificaiton">{message}</div>;
  } else if (!message && error) {
    return <div className="error">{error}</div>;
  }
};

export default Notification;
