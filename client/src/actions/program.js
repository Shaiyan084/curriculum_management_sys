import {
  ALL_UNDERGRADUATE_PROGRAMS_LOADED,
  UNDERGRADUATE_PROGRAM_CREATED,
  UNDERGRADUATE_PROGRAM_UPDATED,
  UNDERGRADUATE_PROGRAM_ENABLED,
  UNDERGRADUATE_PROGRAM_DISABLED,
  SET_UNDERGRADUATE_PROGRAM_LOADING,
  ALL_GRADUATE_PROGRAMS_LOADED,
  GRADUATE_PROGRAM_CREATED,
  GRADUATE_PROGRAM_UPDATED,
  GRADUATE_PROGRAM_ENABLED,
  GRADUATE_PROGRAM_DISABLED,
  SET_GRADUATE_PROGRAM_LOADING,
  PROGRAM_ERROR,
  PROGRAM_LOADED,
  REMOVE_PROGRAM
} from './types';
import axios from 'axios';
import { setAlert } from './alert';

// Get all undergraduate programs
export const getAllUndergraduatePrograms = () => async dispatch => {
  try {
    const res = await axios.get('/api/programs/undergraduate-programs');

    dispatch({
      type: ALL_UNDERGRADUATE_PROGRAMS_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROGRAM_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get all graduate programs
export const getAllGraduatePrograms = () => async dispatch => {
  try {
    const res = await axios.get('/api/programs/graduate-programs');

    dispatch({
      type: ALL_GRADUATE_PROGRAMS_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROGRAM_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Create an undergraduate program
export const createUndergraduateProgram = (
  formData,
  history
) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    await axios.post('/api/programs/undergraduate-program', formData, config);

    dispatch({ type: UNDERGRADUATE_PROGRAM_CREATED });

    dispatch(setAlert('Program created successfully'));

    history.goBack();
  } catch (err) {
    dispatch({
      type: PROGRAM_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });

    dispatch(setAlert('Error occured while creating PROGRAM'));
  }
};

// Create a graduate program
export const createGraduateProgram = (formData, history) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    await axios.post('/api/programs/graduate-program', formData, config);

    dispatch({ type: GRADUATE_PROGRAM_CREATED });

    dispatch(setAlert('Program created successfully'));

    history.goBack();
  } catch (err) {
    console.log(err);

    dispatch({
      type: PROGRAM_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });

    dispatch(setAlert('Error occured while creating PROGRAM'));
  }
};

// Update an undergraduate program
export const updateUndergraduateProgram = (
  id,
  formData,
  history
) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    await axios.put(
      `/api/programs/undergraduate-programs/${id}`,
      formData,
      config
    );

    dispatch({ type: UNDERGRADUATE_PROGRAM_UPDATED });

    dispatch(setAlert('Program updated'));

    history.goBack();
  } catch (err) {
    dispatch({
      type: PROGRAM_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });

    dispatch(setAlert('Error occured while updating PROGRAM'));
  }
};

// Update an graduate program
export const updateGraduateProgram = (
  id,
  formData,
  history
) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    await axios.put(`/api/programs/graduate-programs/${id}`, formData, config);

    dispatch({ type: GRADUATE_PROGRAM_UPDATED });

    dispatch(setAlert('Program updated'));

    history.goBack();
  } catch (err) {
    dispatch({
      type: PROGRAM_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });

    dispatch(setAlert('Error occured while updating PROGRAM'));
  }
};

// Get program by id
export const getProgramById = id => async dispatch => {
  try {
    const res = await axios.get(`/api/programs/${id}`);

    dispatch({
      type: PROGRAM_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROGRAM_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Remove program by id
export const removeProgram = (id, history) => async dispatch => {
  if (window.confirm('Are you sure you want to remove program!'))
    try {
      await axios.delete(`/api/programs/remove-program/${id}`);

      dispatch({
        type: REMOVE_PROGRAM
      });

      dispatch(setAlert('Program has been removed successfully', 'success'));
      history.goBack();
    } catch (err) {
      dispatch(setAlert('Error occured whilst removing program', 'danger'));
    }
};

// Enable an graduate program by id
export const enableUndergraduateProgram = id => async dispatch => {
  dispatch({
    type: SET_UNDERGRADUATE_PROGRAM_LOADING
  });
  try {
    const res = await axios.put(`/api/programs/enable/${id}`);

    dispatch({
      type: UNDERGRADUATE_PROGRAM_ENABLED,
      payload: res.data
    });

    dispatch(setAlert('Undergraudate program enabled successfully', 'success'));
  } catch (err) {
    dispatch({
      type: PROGRAM_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Disable an undergraduate program by id
export const disableUndergraduateProgram = id => async dispatch => {
  dispatch({
    type: SET_UNDERGRADUATE_PROGRAM_LOADING
  });
  try {
    const res = await axios.put(`/api/programs/disable/${id}`);

    dispatch({
      type: UNDERGRADUATE_PROGRAM_DISABLED,
      payload: res.data
    });

    dispatch(
      setAlert('Undergraduate program disabled successfully', 'success')
    );
  } catch (err) {
    dispatch({
      type: PROGRAM_ERROR,
      payload: { msg: err.resposne.statusText, status: err.response.status }
    });
  }
};

// Enable a graduate program by id
export const enableGraduateProgram = id => async dispatch => {
  dispatch({
    type: SET_GRADUATE_PROGRAM_LOADING
  });
  try {
    const res = await axios.put(`/api/programs/enable/${id}`);

    dispatch({
      type: GRADUATE_PROGRAM_ENABLED,
      payload: res.data
    });

    dispatch(setAlert('Graduate program enabled successfully', 'success'));
  } catch (err) {
    dispatch({
      type: PROGRAM_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Disable a graduate program by id
export const disableGraduateProgram = id => async dispatch => {
  dispatch({
    type: SET_GRADUATE_PROGRAM_LOADING
  });
  try {
    const res = await axios.put(`/api/programs/disable/${id}`);

    dispatch({
      type: GRADUATE_PROGRAM_DISABLED,
      payload: res.data
    });

    dispatch(setAlert('Graduate program disabled successfully', 'success'));
  } catch (err) {
    dispatch({
      type: PROGRAM_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
