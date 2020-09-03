import {
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  REGISTER_COORDINATOR_SUCCESS,
  REGISTER_COORDINATOR_FAILED
} from './types';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import { setAlert } from './alert';

// Load the current user
export const loadUser = () => async dispatch => {
  if (localStorage.getItem('token')) {
    setAuthToken(localStorage.getItem('token'));
  }

  try {
    const res = await axios.get('/api/auth/me');

    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({ type: AUTH_ERROR });
  }
};

// Login user
export const loginUser = formData => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post('/api/auth', formData, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data.token
    });

    dispatch(loadUser());
  } catch (err) {
    dispatch({ type: LOGIN_FAILED });

    if (err.response.status === 400) {
      dispatch(setAlert('Invalid credentials'));
    }
  }
};

// Logout
export const logout = () => async dispatch => {
  dispatch({ type: LOGOUT });
};

// Register a Applicant
export const registerApplicant = formData => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post('/api/users/applicant', formData, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data.token
    });

    dispatch(loadUser());
  } catch (err) {
    dispatch({ type: REGISTER_FAILED });

    if (err.response.status === 400) {
      dispatch(setAlert('Invalid credentials'));
    }
  }
};

// Register a Coordinator
export const registerCoordinator = (formData, history) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post('/api/users/coordinator', formData, config);

    dispatch({
      type: REGISTER_COORDINATOR_SUCCESS,
      payload: res.data.token
    });

    history.push('/admin/manage-coordinators');

    dispatch(loadUser());
  } catch (err) {
    dispatch({ type: REGISTER_COORDINATOR_FAILED });

    if (err.message.status === 400) {
      dispatch(setAlert('Invalid credentials'));
    }
  }
};

// // Delete Account
// export const deleteAccount = id => async dispatch => {
//   if (
//     window.confirm(
//       'Are you sure you want to delete this account? This can not be undone!'
//     )
//   ) {
//     try {
//       await axios.delete(`/api/users/delete-account/${id}`);
//       dispatch({ type: DELETE_ACCOUNT });
//       dispatch(
//         setAlert('User account has been deleted successfully', 'success')
//       );
//     } catch (err) {
//       console.log(err);
//       dispatch(setAlert('Error occurerd while deleting account', 'danger'));
//     }
//   }
// };
