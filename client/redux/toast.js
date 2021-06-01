const NEW_NOTIFICATION = 'NEW_NOTIFICATION';

export const newNotification = (messageObject) => ({
    type: NEW_NOTIFICATION, 
    messageObject
})

export default function toast (notification = {}, action) {
    console.log(action);
    switch (action.type) {
        case NEW_NOTIFICATION:
            return action.messageObject
        default:
            return notification;
    }
  }