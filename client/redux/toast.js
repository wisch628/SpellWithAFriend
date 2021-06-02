const NEW_NOTIFICATION = "NEW_NOTIFICATION";
const CLEAR_NOTIFICATION = "CLEAR_NOTIFICATION";

export const newNotification = (messageObject) => ({
  type: NEW_NOTIFICATION,
  messageObject,
});

export const clearNotification = () => ({
  type: CLEAR_NOTIFICATION,
});

export const handleNotifications = (messageObject) => async (dispatch) => {
  try {
    dispatch(newNotification(messageObject));
    setTimeout(dispatch(clearNotification()), 3000);
  } catch (err) {
    console.log(err);
  }
};

export default function toast(notification = {}, action) {
  switch (action.type) {
    case NEW_NOTIFICATION:
      return action.messageObject;
    case CLEAR_NOTIFICATION:
      return {};
    default:
      return notification;
  }
}
