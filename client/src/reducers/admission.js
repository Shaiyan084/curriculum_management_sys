import {
  CURRENT_SESSION_LOADED,
  ALL_ADMISSION_SESSIONS_LOADED,
  ADMISSION_SESSION_CREATED,
  ADMISSION_SESSION_UPDATED,
  ADMISSION_SESSION_ENABLED,
  ADMISSION_SESSION_DISABLED,
  ADMISSION_SESSION_LOADING,
  ADMISSION_SESSION_LOADED,
  ADMISSION_SESSION_REMOVED,
  ADMISSION_SESSION_ERROR,
  GENERATE_ADMISSION_MERIT_LIST,
  GET_MERIT_LIST,
} from '../actions/types';

const initialState = {
  sessions: [],
  session: null,
  loading: true,
  errors: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ALL_ADMISSION_SESSIONS_LOADED:
      return {
        ...state,
        errors: null,
        loading: false,
        sessions: payload,
      };
    case ADMISSION_SESSION_LOADED:
    case CURRENT_SESSION_LOADED:
      return {
        ...state,
        error: null,
        loading: false,
        session: payload,
      };
    case ADMISSION_SESSION_DISABLED:
      return {
        ...state,
        loading: false,
        error: null,
        sessions: [
          ...state.sessions.map(session => {
            if (session._id === payload._id) {
              session.status = payload.status;
            }
            return session;
          }),
        ],
      };
    case ADMISSION_SESSION_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case ADMISSION_SESSION_ENABLED:
      return {
        ...state,
        loading: false,
        error: null,
        sessions: [
          ...state.sessions.map(session => {
            if (session._id === payload._id) {
              session.status = payload.status;
            }
            return session;
          }),
        ],
      };
    case ADMISSION_SESSION_LOADING:
      return {
        ...state,
        loading: true,
      };
    case ADMISSION_SESSION_CREATED:
    case ADMISSION_SESSION_UPDATED:
    case ADMISSION_SESSION_REMOVED:
    case GENERATE_ADMISSION_MERIT_LIST:
    case GET_MERIT_LIST:
    default:
      return state;
  }
}
