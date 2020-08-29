import {
  ALL_COORDINATORS_LOADED,
  COORDINATOR_LOADED,
  COORDINATOR_NAME_UPDATED,
  COORDINATOR_PASSWORD_UPDATED,
  COORDINATOR_PROFILE_PICTURE_UPDATED,
  COORDINATOR_PROFILE_PICTURE_REMOVED,
  COORDINATORS_ERROR,
  SET_AUTH_COORDINATOR_LOADING,
  UNSET_AUTH_COORDINATOR_LOADING
} from '../actions/types';

const initialState = {
  coordinator: null,
  coordinators: [],
  loading: true,
  coordinatorLoading: true,
  errors: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ALL_COORDINATORS_LOADED:
      return {
        ...state,
        error: null,
        loading: false,
        coordinators: payload
      };
    case COORDINATOR_LOADED:
    case COORDINATOR_NAME_UPDATED:
    case COORDINATOR_PROFILE_PICTURE_UPDATED:
    case COORDINATOR_PROFILE_PICTURE_REMOVED:
      return {
        ...state,
        coordinator: payload,
        loading: false,
        isAuthenticated: true
      };
    case SET_AUTH_COORDINATOR_LOADING:
      return {
        ...state,
        coordinatorLoading: true
      };
    case UNSET_AUTH_COORDINATOR_LOADING:
      return {
        ...state,
        coordinatorLoading: false
      };
    case COORDINATORS_ERROR:
      return {
        ...state,
        errors: payload,
        coordinators: []
      };
    case COORDINATOR_PASSWORD_UPDATED:
    default:
      return state;
  }
}
