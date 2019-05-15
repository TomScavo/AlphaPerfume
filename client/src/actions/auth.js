import axios from 'axios';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT,
  CLEAR_ADDRESS
} from './types';
import setAuthToken from '../utils/setAuthToken';
import spinner from './spinner';

// Load User
export const loadUser = () => async dispatch => {
  let token = localStorage.getItem('token');
  console.log('token', token);
  if (token) {
    setAuthToken(token);
  }

  try {
    const res = await axios.get('/api/auth');

    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

export const register = (
  { email, password, password2 },
  history
) => async dispatch => {
  dispatch(spinner());
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ email, password, password2 });

  try {
    const res = await axios.post('/api/users', body, config);
    dispatch(spinner(true));

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());
    history.push('/profile');
  } catch (err) {
    dispatch(spinner(true));
    const errors = err.response.data.errors;
    dispatch({
      type: REGISTER_FAIL,
      payload: errors
    });
  }
};

export const login = ({ email, password }) => async dispatch => {
  dispatch(spinner());
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post('/api/auth', body, config);
    dispatch(spinner(true));

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    dispatch(spinner(true));
    console.log(errors);
    dispatch({
      type: LOGIN_FAIL,
      payload: errors
    });
  }
};

export const logout = props => dispatch => {
  dispatch({
    type: LOGOUT
  });
  dispatch({
    type: CLEAR_ADDRESS
  });
  props.history.push('/logoutsuccess');
};
