import Axios from 'axios';

const CREATE_GAME = 'CREATE_GAME';
// const GET_GAME = 'GET_GAME';

// const getGame = (game) => ({
//     type: GET_GAME,
//     game
// });

const createGame = (game) => ({
    type: CREATE_GAME,
    game
})

export const createGameThunkCreator = (userId, color, history) => {
    return async (dispatch) => {
        const response = await Axios.post(`/api/game`, {userId: userId, color: color});
        const game = response.data;
        dispatch(createGame(game));
        history.push(`/play/${game.id}/${userId}`)
    }
}

export default function gameId (game = '', action) {
    switch (action.type) {
        case CREATE_GAME:
            return action.game
        default:
            return game;
    }
    
  }