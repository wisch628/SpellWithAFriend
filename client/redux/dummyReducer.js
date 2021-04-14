import Axios from 'axios';

//actions
const SAMPLE_ACTION = 'SAMPLE_ACTION';

//action creators
const sampleActionCreator = (sample) => ({
    type: SAMPLE_ACTION,
    sample
});

//thunk creators
export const sampleThunkCreator = () => {
    return async (dispatch) => {
        const response = await Axios.get('/api/SAMPLELINK');
        let sample = response.data;
        dispatch(sampleActionCreator(sample));
        //history.push('/redirectLink);
    }
}

//reducers
export default function dummyReducer (state = {}, action) {
    switch (action.type) {
        case SAMPLE_ACTION:
            return action.sample
        default:
            return state;
    }
    
  }