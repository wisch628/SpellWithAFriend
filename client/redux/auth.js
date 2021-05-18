import axios from 'axios';

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
  if (token !== 'undefined' && token) {
    console.log('token exists');
    const res = await axios.get('/api/auth/me', {
      headers: {
        authorization: token,
      },
    });
    return dispatch(setAuth(res.data));
  }
};

export const authenticateThunkCreator = (email, password, formName, firstName, lastName) => async (dispatch) => {
  try {
    const res = await axios.post(`/api/auth/${formName}`, {
      email,
      password,
      firstName,
      lastName,
      history
    });
    console.log(res);
    let storage;

    if (localStorage) {
      storage = Object.keys(localStorage).filter((key) => {
        if (Number(key)) {
          return Number(key);
        }
      });
    }
    localStorage.clear();
    localStorage.setItem(TOKEN, res.data.token);
    const token = localStorage.getItem(TOKEN);
    dispatch(me());
    dispatch(getUser(email));
    console.log(this.props, 'props in thunk');
      if (this.props.path === "/games") {
        
          history.push('/game')
      } else {
          this.props.onDone()
      }

  } catch (authError) {
    return dispatch(setAuth({ error: authError }));
  }
};

export const logout = () => {
  window.localStorage.removeItem(TOKEN);
  history.push('/login');
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
