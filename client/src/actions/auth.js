import {
  USER_LOADED,
  SET_AUTH_USER_LOADING,
  UNSET_AUTH_USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  REGISTER_COORDINATOR_SUCCESS,
  REGISTER_COORDINATOR_FAILED,
  NAME_UPDATED,
  PASSWORD_UPDATED,
  PROFILE_PICTURE_UPLOADED,
  PROFILE_PICTURE_REMOVED
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

// Change Name
export const changeName = formData => async dispatch => {
  dispatch({
    type: SET_AUTH_USER_LOADING
  });

  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.put('/api/users/name', formData, config);

    dispatch({
      type: NAME_UPDATED,
      payload: res.data
    });

    dispatch({
      type: UNSET_AUTH_USER_LOADING
    });

    dispatch(setAlert('Name updated successfully', 'success'));
  } catch (err) {
    dispatch({
      type: UNSET_AUTH_USER_LOADING
    });

    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.message, 'danger')));
    }
  }
};

// Update Password
export const updatePassword = password => async dispatch => {
  dispatch({
    type: SET_AUTH_USER_LOADING
  });

  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const body = JSON.stringify({ password });

    const res = await axios.put('/api/users/update-password', body, config);

    dispatch({
      type: PASSWORD_UPDATED,
      payload: res.data
    });

    dispatch({
      type: UNSET_AUTH_USER_LOADING
    });

    dispatch(setAlert('Password updated successfully', 'success'));
  } catch (err) {
    dispatch({
      type: UNSET_AUTH_USER_LOADING
    });

    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.message, 'danger')));
    }
  }
};

// Upload Profile Picture
export const uploadProfilePicture = formData => async dispatch => {
  dispatch({
    type: SET_AUTH_USER_LOADING
  });
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.put(
      '/api/users/profile-picture/upload',
      formData,
      config
    );

    dispatch({
      type: PROFILE_PICTURE_UPLOADED,
      payload: res.data
    });

    dispatch(setAlert('Profile picture uploaded successfully', 'success'));
  } catch (err) {
    dispatch({
      type: UNSET_AUTH_USER_LOADING
    });

    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.message, 'danger')));
    }
  }
};

// Remove Profile Picture
export const removeProfilePicture = () => async dispatch => {
  dispatch({
    type: SET_AUTH_USER_LOADING
  });
  try {
    const res = await axios.put('/api/users/profile-picture/remove');

    dispatch({
      type: PROFILE_PICTURE_REMOVED,
      payload: res.data
    });

    dispatch(setAlert('Profile picture removed successfully', 'success'));
  } catch (err) {
    dispatch({
      type: UNSET_AUTH_USER_LOADING
    });

    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.message, 'danger')));
    }
  }
};
