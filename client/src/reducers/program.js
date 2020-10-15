import {
  ALL_UNDERGRADUATE_PROGRAMS_LOADED,
  UNDERGRADUATE_PROGRAM_CREATED,
  UNDERGRADUATE_PROGRAM_UPDATED,
  UNDERGRADUATE_PROGRAM_ENABLED,
  UNDERGRADUATE_PROGRAM_DISABLED,
  SET_UNDERGRADUATE_PROGRAM_LOADING,
  ALL_UNDERGRADUATE_PROGRAMS_DISABLED,
  ALL_GRADUATE_PROGRAMS_LOADED,
  GRADUATE_PROGRAM_CREATED,
  GRADUATE_PROGRAM_UPDATED,
  GRADUATE_PROGRAM_ENABLED,
  GRADUATE_PROGRAM_DISABLED,
  SET_GRADUATE_PROGRAM_LOADING,
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
    case SET_UNDERGRADUATE_PROGRAM_LOADING:
    case SET_GRADUATE_PROGRAM_LOADING:
      return {
        ...state,
        loading: true
      };
    case UNDERGRADUATE_PROGRAM_ENABLED:
      return {
        ...state,
        loading: false,
        errors: null,
        undergraduatePrograms: [
          ...state.undergraduatePrograms.map(undergraduateProgram => {
            if (undergraduateProgram._id === payload._id) {
              undergraduateProgram.status = payload.status;
            }
            return undergraduateProgram;
          })
        ]
      };
    case UNDERGRADUATE_PROGRAM_DISABLED:
      return {
        ...state,
        loading: false,
        errors: null,
        undergraduatePrograms: [
          ...state.undergraduatePrograms.map(undergraduateProgram => {
            if (undergraduateProgram._id === payload._id) {
              undergraduateProgram.status = payload.status;
            }
            return undergraduateProgram;
          })
        ]
      };
    case GRADUATE_PROGRAM_ENABLED:
      return {
        ...state,
        loading: false,
        errors: null,
        graduatePrograms: [
          ...state.graduatePrograms.map(graduateProgram => {
            if (graduateProgram._id === payload._id) {
              graduateProgram.status = payload.status;
            }
            return graduateProgram;
          })
        ]
      };
    case GRADUATE_PROGRAM_DISABLED:
      return {
        ...state,
        loading: false,
        errors: null,
        graduatePrograms: [
          ...state.graduatePrograms.map(graduateProgram => {
            if (graduateProgram._id === payload._id) {
              graduateProgram.status = payload.status;
            }
            return graduateProgram;
          })
        ]
      };
    case ALL_UNDERGRADUATE_PROGRAMS_DISABLED:
    case UNDERGRADUATE_PROGRAM_CREATED:
    case UNDERGRADUATE_PROGRAM_UPDATED:
    case GRADUATE_PROGRAM_CREATED:
    case GRADUATE_PROGRAM_UPDATED:
    case REMOVE_PROGRAM:
    default:
      return state;
  }
}
