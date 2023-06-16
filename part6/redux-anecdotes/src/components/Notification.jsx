import { useSelector, useDispatch } from 'react-redux';
import { createNotification } from '../reducers/notificationReducer';

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 20,
  };
  const notification = useSelector((state) => state.notification);
  const dispatch = useDispatch();

  notification &&
    setTimeout(() => {
      dispatch(createNotification(''));
    }, 5000);

  return notification && <div style={style}>{notification}</div>;
};

export default Notification;
