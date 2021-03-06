import axios from 'axios';
import { handleNotifications } from './toast';

const TOKEN = 'token';

/**
 * ACTION TYPES
 */
const SET_AUTH = 'SET_AUTH';

/**
 * ACTION CREATORS
 */
export const setAuth = (auth) => ({ type: SET_AUTH, auth });

/**
 * THUNK CREATORS
 */
export const me = () => async (dispatch) => {
  const token = window.localStorage.getItem(TOKEN);
  if (token) {
    const res = await axios.get('/api/auth/me', {
      headers: {
        authorization: token,
      },
    });
    return dispatch(setAuth(res.data));
  } else {
    console.log('no token');
  }
};

export const authenticateThunkCreator =
  (email, password, formName, firstName, lastName) => async (dispatch) => {
    try {
      const res = await axios.post(`/api/auth/${formName}`, {
        email,
        password,
        firstName,
        lastName
      });
      if (res.data.token) {
        window.localStorage.setItem(TOKEN, res.data.token);
        dispatch(me());
      }
    } catch (authError) {
      const toast = {type: 'error', message: authError.response.data};
      dispatch(handleNotifications(toast))
        
    }
  };

export const logOutThunk = () => {
  window.localStorage.removeItem(TOKEN);
  // history.push('/login');
  return {
    type: SET_AUTH,
    auth: {},
  };
};

/**
 * REDUCER
 */
export default function (state = {}, action) {
  switch (action.type) {
    case SET_AUTH:
      return action.auth;
    default:
      return state;
  }
}
