import Axios from 'axios';

const GET_ALL_GAMES = 'GET_ALL_GAMES';

const getAllGames = (games) => ({
    type: GET_ALL_GAMES,
    games
});

export const getAllGamesThunkCreator = (userId) => {
    return async (dispatch) => {
        console.log(userId);
        const response = await Axios.get(`/api/game/allgames/${userId}`);
        const allGames = response.data;
        dispatch(getAllGames(allGames));
    }
}

export default function allGames (allGames = [], action) {
    switch (action.type) {
        case GET_ALL_GAMES:
            return action.games
        default:
            return allGames;
    }
    
  }