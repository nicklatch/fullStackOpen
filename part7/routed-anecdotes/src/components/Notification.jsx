import {
  useNotificationDispatch,
  useNotificationValue,
} from '../context/NotificationContext';

const Notification = () => {
  const notification = useNotificationValue();
  const dispatch = useNotificationDispatch();

  if (notification !== '') {
    setTimeout(() => {
      dispatch({ type: 'CLEAR' });
    }, 5000);
  }

  return notification ? <div>{notification}</div> : null;
};

export default Notification;
