import PropTypes from 'prop-types';

const Notification = ({ notification }) => {
  return notification && <div className='notification'>{notification}</div>;
};

Notification.propTypes = {
  notification: PropTypes.string,
};

export default Notification;
