import Axios from 'axios';

const CREATE_GAME = 'CREATE_GAME';
const GET_GAME = 'GET_GAME';
const JOIN_GAME = 'JOIN_GAME';

const getGame = (game) => ({
    type: GET_GAME,
    game
});

const createGame = (game) => ({
    type: CREATE_GAME,
    game
})

const joinGame = (game) => ({
    type: JOIN_GAME, 
    game
})


export const getGameThunkCreator = (gameId, userId) => {
    return async (dispatch) => {
        const response = await Axios.get(`/api/game/${gameId}/${userId}`);
        const game = response.data;
        dispatch(getGame(game));
    }
}

export const createGameThunkCreator = (userId, color, history) => {
    return async (dispatch) => {
        const response = await Axios.post(`/api/game`, {userId: userId, color: color});
        const game = response.data;
        console.log(game);
        dispatch(createGame(game));
        history.push(`/play/${game.id}/`)
    }
}

export const joinGameThunkCreator = (userId, color, gameCode, history) => {
    return async (dispatch) => {
        const response = await Axios.post(`/api/game/join/${gameCode}`, {userId: userId, color: color});
        const game = response.data;
        dispatch(joinGame(game));
        history.push(`/play/${game.id}/`)
    }
}

export default function game (game = {}, action) {
    switch (action.type) {
        case CREATE_GAME:
            return action.game
        case GET_GAME:
            return action.game
        case JOIN_GAME:
            return action.game
        default:
            return game;
    }
    
  }