import { USER_LOADED, AUTH_ERROR } from './types';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';

// Load the current user
export const loadUser = () => async (dispatch) => {
  if (localStorage.getItem('token')) {
    setAuthToken(localStorage.getItem('token'));
  }

  try {
    const res = await axios.get('/api/auth/me');

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({ type: AUTH_ERROR });
  }
};
