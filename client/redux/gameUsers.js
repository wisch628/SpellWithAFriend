import Axios from 'axios';

const GET_GAME_USERS = 'GET_GAME_USERS';
// const GOT_NEW_USER_FROM_SERVER = 'GOT_NEW_USER_FROM_SERVER';

export const getGameUsers = (users) => ({
    type: GET_GAME_USERS,
    users
})

// export const getUserFromServer = (user) => ({
//     type: GOT_NEW_USER_FROM_SERVER,
//     user
// })

export const getGameUsersThunkCreator = (gameId) => {
    return async (dispatch) => {
        const response = await Axios.get(`/api/user/game/${gameId}`);
        const users = response.data;
        dispatch(getGameUsers(users));
    }
}

export default function gameUsersReducer (gameUsers = [], action) {
    switch (action.type) {
        case GET_GAME_USERS:
            return action.users
        // case GOT_NEW_USER_FROM_SERVER:
        //     return [...gameUsers, action.user]
        default:
            return gameUsers;
    }
    
  }