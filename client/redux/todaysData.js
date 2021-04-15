import Axios from 'axios';

//actions
const GET_DATA = 'GET_DATA';

//action creators
const getTodaysData = (data) => ({
    type: GET_DATA,
    data
});

//thunk creators
export const todaysDataThunkCreator = () => {
    return async (dispatch) => {
        const response = await Axios.get('/api/today');
        let data = response.data;
        console.log('called thunk', data);
        dispatch(getTodaysData(data));
        //history.push('/redirectLink);
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