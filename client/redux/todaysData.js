import Axios from 'axios';
import { handleNotifications } from './toast';

//actions
const GET_DATA = 'GET_DATA';

//action creators
const getTodaysData = (data) => ({
    type: GET_DATA,
    data
});



//thunk creators
export const todaysDataThunkCreator = (history) => {
    return async (dispatch) => {
        try {
            const response = await Axios.get('/api/today');
            let data = response.data;
            dispatch(getTodaysData(data));
        } catch (err) {
            console.log(err);
            const toast = {type: 'error', message: err.response.data};
            dispatch(handleNotifications(toast))
            history.push(`/`);
        }
    }
}

//reducers
export default function todaysData (state = {}, action) {
    switch (action.type) {
        case GET_DATA:
            return action.data
        default:
            return state;
    }
    
  }