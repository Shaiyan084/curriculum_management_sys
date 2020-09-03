import {
  ALL_UNDERGRADUATE_PROGRAMS_LOADED,
  UNDERGRADUATE_PROGRAM_CREATED,
  UNDERGRADUATE_PROGRAM_UPDATED,
  ALL_GRADUATE_PROGRAMS_LOADED,
  GRADUATE_PROGRAM_CREATED,
  GRADUATE_PROGRAM_UPDATED,
  PROGRAM_ERROR,
  PROGRAM_LOADED,
  REMOVE_PROGRAM
} from '../actions/types';

const initialState = {
  program: null,
  undergraduatePrograms: [],
  graduatePrograms: [],
  loading: true,
  errors: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ALL_GRADUATE_PROGRAMS_LOADED:
      return {
        ...state,
        loading: false,
        errors: null,
        graduatePrograms: payload
      };
    case ALL_UNDERGRADUATE_PROGRAMS_LOADED:
      return {
        ...state,
        loading: false,
        errors: null,
        undergraduatePrograms: payload
      };
    case PROGRAM_LOADED:
      return {
        ...state,
        loading: false,
        errors: null,
        program: payload
      };
    case PROGRAM_ERROR:
      return {
        ...state,
        loading: false,
        errors: payload
      };
    case UNDERGRADUATE_PROGRAM_CREATED:
    case UNDERGRADUATE_PROGRAM_UPDATED:
    case GRADUATE_PROGRAM_CREATED:
    case GRADUATE_PROGRAM_UPDATED:
    case REMOVE_PROGRAM:
    default:
      return state;
  }
}
