import Axios from 'axios';

//actions
const SAMPLE_ACTION = 'SAMPLE_ACTION';

//action creators
const sampleActionCreator = (samples) => ({
    type: SAMPLE_ACTION,
    samples
});

//thunk creators
export const sampleThunkCreator = () => {
    return async (dispatch) => {
        const response = await Axios.get('/api/sample');
        let samples = response.data;
        dispatch(sampleActionCreator(samples));
        //history.push('/redirectLink);
    }
}

//reducers
export default function dummyReducer (state = {}, action) {
    switch (action.type) {
        case SAMPLE_ACTION:
            return action.samples
        default:
            return state;
    }
    
  }