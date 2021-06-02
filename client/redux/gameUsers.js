import Axios from 'axios';

const GET_GAME_USERS = 'GET_GAME_USERS';

const getGameUsers = (users) => ({
    type: GET_GAME_USERS,
    users
})


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
        default:
            return gameUsers;
    }
    
  }