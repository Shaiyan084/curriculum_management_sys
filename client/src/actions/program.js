import {
  ALL_UNDERGRADUATE_PROGRAMS_LOADED,
  UNDERGRADUATE_PROGRAM_CREATED,
  UNDERGRADUATE_PROGRAM_UPDATED,
  ALL_GRADUATE_PROGRAMS_LOADED,
  GRADUATE_PROGRAM_CREATED,
  GRADUATE_PROGRAM_UPDATED,
  PROGRAM_ERROR,
  PROGRAM_LOADED,
} from './types';
import axios from 'axios';
import { setAlert } from './alert';

// Get all undergraduate programs
export const getAllUndergraduatePrograms = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/programs/undergraduate-programs');

    dispatch({
      type: ALL_UNDERGRADUATE_PROGRAMS_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROGRAM_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get all graduate programs
export const getAllGraduatePrograms = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/programs/graduate-programs');

    dispatch({
      type: ALL_GRADUATE_PROGRAMS_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROGRAM_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Create an undergraduate program
export const createUndergraduateProgram = (formData, history) => async (
  dispatch
) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    await axios.post('/api/programs/undergraduate-program', formData, config);

    dispatch({ type: UNDERGRADUATE_PROGRAM_CREATED });

    dispatch(setAlert('Program created successfully'));

    history.goBack();
  } catch (err) {
    dispatch({
      type: PROGRAM_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });

    dispatch(setAlert('Error occured while creating PROGRAM'));
  }
};

// Create a graduate program
export const createGraduateProgram = (formData, history) => async (
  dispatch
) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    await axios.post('/api/programs/graduate-programs', config, formData);

    dispatch({ type: GRADUATE_PROGRAM_CREATED });

    dispatch(setAlert('Program created successfully'));

    history.goBack();
  } catch (err) {
    dispatch({
      type: PROGRAM_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });

    dispatch(setAlert('Error occured while creating PROGRAM'));
  }
};

// Update an undergraduate program
export const updateUndergraduateProgram = (id, formData, history) => async (
  dispatch
) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
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
      payload: { msg: err.response.statusText, status: err.response.status },
    });

    dispatch(setAlert('Error occured while updating PROGRAM'));
  }
};

// Update an graduate program
export const updateGraduateProgram = (id, formData, history) => async (
  dispatch
) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    await axios.put(`/api/programs/graduate-programs/${id}`, formData, config);

    dispatch({ type: GRADUATE_PROGRAM_UPDATED });

    dispatch(setAlert('Program updated'));

    history.goBack();
  } catch (err) {
    dispatch({
      type: PROGRAM_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });

    dispatch(setAlert('Error occured while updating PROGRAM'));
  }
};

// Get program by id
export const getProgramById = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/programs/${id}`);

    dispatch({
      type: PROGRAM_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROGRAM_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
