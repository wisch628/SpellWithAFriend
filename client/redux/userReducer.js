import Axios from 'axios';

const CREATE_USER = 'CREATE_USER';
const GET_USER = 'FIND_USER';
const GET_GAME_AND_USER = 'GET_GAME_AND_USER';

const createUser = (user) => ({
    type: CREATE_USER,
    user
})

const getUser = (user) => ({
    type: GET_USER,
    user
})

const getGameAndUser = (user) => ({
    type: GET_GAME_AND_USER,
    user
})

export const createUserThunkCreator = (email) => {
    return async (dispatch) => {
        const response = await Axios.post('/api/user', email);
        const user = response.data;
        dispatch(createUser(user));
    }
}

export const getUserThunkCreator = (email) => {
    return async (dispatch) => {
        const response = await Axios.get(`/api/user/${email}`);
        const user = response.data;
        dispatch(getGameAndUser(user));
    }
}

export const getGameAndUserThunkCreator = (gameId, userId) => {
    return async (dispatch) => {
        const response = await Axios.get(`/api/user/${userId}/${gameId}`);
        const user = response.data;
        dispatch(getUser(user));
    }
}

export default function userReducer (user = {}, action) {
    switch (action.type) {
        case CREATE_USER:
            return action.user
        case GET_USER: 
            return action.user
        case GET_GAME_AND_USER:
            return action.user
        default:
            return user;
    }
    
  }