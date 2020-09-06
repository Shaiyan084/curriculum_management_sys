import axios from 'axios';
import { setAlert } from './alert';
import {
  PROFILE_LOADED,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  SET_PROFILE_LOADING,
  UPDATE_ADMIN_PERSONAL_DETAILS,
  UPDATE_ADMIN_EDUCATION_DETAILS,
  UPDATE_ADMIN_EXPERIENCE_DETAILS,
  UPDATE_COORDINATOR_PERSONAL_DETAILS,
  UPDATE_COORDINATOR_EDUCATION_DETAILS,
  UPDATE_COORDINATOR_EXPERIENCE_DETAILS
} from './types';
import { loadUser } from './auth';

// Get current user profile
export const getCurrentProfile = id => async dispatch => {
  dispatch({
    type: SET_PROFILE_LOADING
  });
  try {
    const res = await axios.get(`/api/profile/${id}`);

    dispatch({
      type: PROFILE_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
